import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post('/total_price')
  // async calculateTotalPrice(@Body() body: any) {
  //   return this.orderService.calculateOrderTotalPrice(body);
  // }

  @UseGuards(AuthGuard)
  @Get('/:restaurantId')
  async calculateDeliveryPrice(
    @Req() req: any,
    @Param('restaurantId', new ParseIntPipe()) restaurantId: number,
  ) {
    const { tgId } = req.user;

    return this.orderService.calculateDeliveryPrice(restaurantId, tgId);
  }
}
