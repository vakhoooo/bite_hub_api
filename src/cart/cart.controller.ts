import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  upsertCart(@Body() body: any, @Req() req: any) {
    const { mealId, action, restaurantId, quantity } = body;

    const { tgId } = req.user;

    return this.cartService.upsertCart(
      tgId,
      restaurantId,
      mealId,
      action,
      quantity,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getCart(@Req() req: any) {
    const { tgId } = req.user;
    return this.cartService.getCart(tgId);
  }
}
