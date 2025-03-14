import { Controller, Get, Query } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('/')
  async getConfiguration(@Query('') query: any) {
    const { configName } = query;
    return this.configurationService.getConfig(configName);
  }
}
