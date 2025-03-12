import { Module } from '@nestjs/common';
import { GeoGraphyController } from './geography.controller';
import { GeographyService } from './geography.service';

@Module({
  controllers: [GeoGraphyController],
  providers: [GeographyService],
  exports: [GeographyService],
})
export class GeographyModule {}
