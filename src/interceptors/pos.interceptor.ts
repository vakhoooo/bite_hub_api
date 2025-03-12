import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PositionINterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (!request.user || !request.user.tgId) {
      return next.handle();
    }

    const user = await this.prisma.user.findUnique({
      where: { tgId: request.user.tgId },
      select: { lat: true, long: true },
    });

    if (user) {
      request.user.lat = user.lat;
      request.user.long = user.long;
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
