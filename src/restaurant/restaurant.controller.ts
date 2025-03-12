import {
  Controller,
  Query,
  ParseIntPipe,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { AuthGuard } from 'src/guards/Auth.guard';
import { PositionINterceptor } from 'src/interceptors/pos.interceptor';
import { OrderService } from 'src/order/order.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private restaurantService: RestaurantService,
    private orderService: OrderService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:restaurantId')
  async getRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Req() req: any,
  ) {
    const { tgId } = req.user;

    const restaurant =
      await this.restaurantService.getRestaurantById(restaurantId);

    if (restaurant) {
      const deliveryData = await this.restaurantService.getCachedDeliveryData(
        restaurantId,
        tgId,
      );
      return { ...restaurant, delivery: deliveryData };
    }
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(PositionINterceptor)
  @Get('/')
  async getRestaurantList(@Req() req: any, @Query('') query: any) {
    const { lat, long, tgId } = req.user;

    const res = await this.restaurantService.getRestaurantList(
      query,
      +lat,
      +long,
      tgId,
    );

    if (!res.length) {
      throw new NotFoundException(
        'No restaurants found around you probably we not delivery in your area products :(',
      );
    }

    return res;
  }
}
