import { Cache } from '@nestjs/cache-manager';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma.service';
import { calculateRangeTime, localeMS } from 'src/utils/date';
import { Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: Cache,
    private readonly orderService: OrderService,
  ) {}

  private async getFromCache<T>(key: string): Promise<T | null> {
    return this.cache.get<T | null>(key);
  }

  private async setToCache<T>(
    key: string,
    value: T,
    ttl = 300000,
  ): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async getRestaurantById(restaurantId: number): Promise<Restaurant | null> {
    const cacheKey = `restaurant_${restaurantId}`;
    let restaurant = await this.getFromCache<Restaurant>(cacheKey);

    if (!restaurant) {
      restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        include: { meal: { where: { isActive: true } } },
      });

      if (!restaurant) {
        throw new NotFoundException({
          message: 'Restaurant not found',
          code: HttpStatusCode.NotFound,
        });
      }

      await this.setToCache(cacheKey, restaurant);
    }

    return restaurant;
  }

  async getCachedDeliveryData(
    restaurantId: number,
    tgId: string,
  ): Promise<any> {
    const cacheKey = `delivery_${restaurantId}_${tgId}`;
    const cachedData = await this.getFromCache<{
      restaurantId: number;
      delivery: { from: string; to: string };
      ttlInMS: bigint;
    }>(cacheKey);

    if (cachedData && cachedData.ttlInMS > Date.now()) {
      return cachedData;
    }

    const {
      delivery: { from, to },
      ttl,
      price,
    } = await this.orderService.calculateDeliveryPrice(restaurantId, tgId);
    const deliveryTimeMinutes = calculateRangeTime(from, to);
    const ttlInMS = localeMS(ttl);

    const data = { price, ttlInMS, restaurantId, deliveryTimeMinutes };

    await this.setToCache(cacheKey, data, 300000);
    return data;
  }

  private generateRestaurantQuery(
    userLat: number,
    userLong: number,
    distance: number,
    cuisineType?: string,
  ): string {
    const baseQuery = `
      SELECT *, 
        6371000 * acos(
          cos(radians(${userLat})) * cos(radians(lat)) * 
          cos(radians(long) - radians(${userLong})) + 
          sin(radians(${userLat})) * sin(radians(lat))
        ) AS distance
      FROM "Restaurant"
      WHERE (
        6371000 * acos(
          cos(radians(${userLat})) * cos(radians(lat)) * 
          cos(radians(long) - radians(${userLong})) + 
          sin(radians(${userLat})) * sin(radians(lat))
        ) <= ${distance}
      )`;

    const conditions = [`"isOpen" = true`, `"isBlocked" = false`];

    if (cuisineType) {
      conditions.push(`cuisine = '${cuisineType}'`);
    }

    return `${baseQuery} AND ${conditions.join(' AND ')} ORDER BY distance ASC;`;
  }

  async getRestaurantList(
    queryParams: any,
    userLat: number,
    userLong: number,
    tgId: string,
    distance = 1500,
    attempt = 0,
  ): Promise<any[]> {
    console.log("Shemodisssssssss")
    const query = this.generateRestaurantQuery(
      userLat,
      userLong,
      distance,
      queryParams.cuisineType,
    );
    const results: any[] = await this.prisma.$queryRawUnsafe(query);

    if (!results.length && attempt < 3) {
      return this.getRestaurantList(
        queryParams,
        userLat,
        userLong,
        tgId,
        distance * 2,
        attempt + 1,
      );
    }


    if (results.length) {
      const deliveryData = await Promise.all(
        results.map(({ id }: { id: number }) =>
          this.getCachedDeliveryData(id, tgId),
        ),
      );

      return results.map((restaurant, index) => ({
        ...restaurant,
        delivery: deliveryData[index],
      }));
    }

    return [];
  }
}
