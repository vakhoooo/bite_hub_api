import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ConfigurationController],
  providers: [ConfigurationService, PrismaService],
})
export class ConfigurationModule {}
