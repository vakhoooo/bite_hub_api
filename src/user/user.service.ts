import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUserContact } from './interface/user';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOrCreateUser(userData: any) {
    try {
      const {
        tgId,
        username: userName,
        first_name,
        last_name,
        ...rest
      } = userData;

      if (!tgId) {
        throw new Error('tgId is missing or invalid');
      }

      let user: any;

      user = await this.cacheManager.get(tgId);

      if (!user) {
        user = await this.prisma.user.findUnique({
          where: { tgId },
        });

        if (user && user?.isBlocked) {
          throw new ForbiddenException('user is blocked');
        }

        if (!user) {
          const userFallbackName =
            userName ||
            (first_name && last_name && `${first_name}_${last_name}`) ||
            first_name ||
            last_name;

          user = await this.prisma.user.create({
            data: {
              tgId,
              userName: userFallbackName,
              role: 'USER',
            },
          });
        }

        await this.cacheManager.set(tgId, user, 1000 * 60 * 5);
      }

      return user;
    } catch (error) {
      console.error('Error finding or creating user:', error);
      return null;
    }
  }

  async updateUserContact(
    contactUpdatePayload: Partial<IUserContact & { tgId: string }>,
  ) {
    const { tgId, ...rest } = contactUpdatePayload;

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { tgId, isBlocked: false },
      });

      if (!existingUser) {
        throw new NotFoundException('No user found to update');
      }

      ['lat', 'long'].forEach((key) => {
        if (contactUpdatePayload[key]) {
          contactUpdatePayload[key] = +contactUpdatePayload[key];
        }
      });

      const updatedUser = await this.prisma.user.update({
        where: { tgId },
        data: rest,
      });

      await this.cacheManager.del(tgId);
      await this.cacheManager.set(tgId, updatedUser, 1000 * 60 * 5);

      console.log('@@@@@@@@@@@@@@@updatedUser', updatedUser);

      return updatedUser;
    } catch (error) {
      console.error('Failed to update user contact info:', error);
      throw new Error('Could not update user contact information.');
    }
  }
}
