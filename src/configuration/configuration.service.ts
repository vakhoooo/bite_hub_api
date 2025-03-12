import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConfigurationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async getConfig(configName: string) {
    const cachedData = await this.cacheManager.get(configName);

    if (!cachedData) {
      const res = await this.prisma.config.findUnique({
        where: { name: configName },
      });

      if (!res) {
        throw new NotFoundException(
          'cannot find config with name' + configName,
        );
      }

      await this.cacheManager.set(configName, res, 1000 * 60 * 5);

      return res;
    }

    return cachedData;
  }
}
