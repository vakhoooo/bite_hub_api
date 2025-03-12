import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from 'src/prisma.service';
import { OrderModule } from 'src/order/order.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [OrderModule, CacheModule.register()],
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaService],
})
export class RestaurantModule {}
