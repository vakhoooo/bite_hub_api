import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

type action = 'INCREMENT' | 'DECREMENT';

@Injectable()
export class CartService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async upsertCart(
    userTgId: string,
    restaurantId: number,
    mealId: number,
    action: action,
    quantity: number = 1,
  ) {
    const key = `cart-${userTgId}`;

    let cart: {
      restaurantId: number;
      meals: { mealId: number; quantity: number }[];
    } | null = await this.cacheManager.get(key);

    if (cart && cart.restaurantId !== restaurantId) {
      throw new Error("restaurant id's not matching");
    }

    if (!cart) {
      cart = {
        restaurantId,
        meals: [{ mealId, quantity }],
      };

      await this.cacheManager.set(key, cart, 1000 * 60 * 10);
      return cart;
    }

    const index = cart.meals.findIndex(({ mealId: id }) => id === mealId);

    if (action === 'INCREMENT') {
      if (index === -1) {
        cart.meals.push({ mealId, quantity });
      } else {
        cart.meals[index].quantity += quantity; // Increase by the given amount
      }
    }

    if (action === 'DECREMENT') {
      if (index !== -1) {
        cart.meals[index].quantity -= quantity; // Decrease by the given amount

        if (cart.meals[index].quantity <= 0) {
          cart.meals.splice(index, 1); // Remove if quantity reaches 0
        }
      }
    }

    await this.cacheManager.set(key, cart, 1000 * 60 * 10);
    return cart;
  }

  async getCart(userTgId: string) {
    const key = `cart-${userTgId}`;

    const cart = await this.cacheManager.get(key);

    if (!cart) {
      return { meals: [] };
    }

    return cart;
  }
}
