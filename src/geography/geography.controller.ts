import { Controller, Get, Query } from '@nestjs/common';
import { GeographyService } from './geography.service';

@Controller('geography')
export class GeoGraphyController {
  constructor(private readonly geocodingService: GeographyService) {}

  @Get('/')
  async getAddress(@Query('address') address: string) {
    return this.geocodingService.getAddress(address);
  }
}
