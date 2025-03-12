import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const userQuery = request.headers.userdata;

      if (!userQuery) {
        throw new ForbiddenException('User data is missing in the query');
      }

      const urlParams = new URLSearchParams(userQuery);
      const userEncoded = urlParams.get('user');

      if (!userEncoded) {
        throw new ForbiddenException('User data is not present in the query');
      }

      const userData = JSON.parse(decodeURIComponent(userEncoded));

      if (!userData?.id) {
        throw new ForbiddenException('Invalid user data');
      }

      userData.tgId = String(userData.id);

      request.user = userData;

      return true;
    } catch (error) {
      console.error('Error in AuthGuard:', error.message);
      throw new ForbiddenException('Not authorized');
    }
  }
}
