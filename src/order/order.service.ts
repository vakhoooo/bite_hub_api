import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import axios from 'axios';
import { GeographyService } from 'src/geography/geography.service';
import { PrismaService } from 'src/prisma.service';
import { calculatePercent } from 'src/utils/math';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private geographyService: GeographyService,
  ) {}

  async calculateDeliveryPrice(restaurantId: number, tgId: string) {
    try {
      const [restaurant, user] = await Promise.all([
        //restaurant
        this.prisma.restaurant.findUnique({
          where: { id: restaurantId },
          omit: {
            introImageUrl: true,
            name: true,
            percent: true,
          },
        }),

        this.prisma.user.findUnique({
          omit: { id: true, tgId: true, userName: true },
          where: { tgId: tgId },
        }), //user
      ]);

      if (!restaurant) {
        throw new NotFoundException('no restaurant found');
      }

      if (!restaurant.address || !restaurant.city || !restaurant.phoneNumber) {
        throw new NotImplementedException('no restaurant contacts provided');
      }

      if (!user) {
        throw new NotFoundException('user not found');
      }

      const { address: userAddress } = user;

      const { address: restaurantAddress } = restaurant;

      console.log('@@@@@@@@@@@@@@user', user);
      console.log('@@@@@@@@@@@@@@restaurant', restaurant);

      const routePoints = this.geographyService.createRoutePoints(
        restaurantAddress,
        userAddress,
      );

      const deliveryPrice =
        await this.geographyService.getDeliveryPrice(routePoints);

      return deliveryPrice;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
