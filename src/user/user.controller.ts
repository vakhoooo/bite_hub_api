import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getUser(@Req() req: any) {
    const user = req.user;

    return this.userService.findOrCreateUser(user);
  }

  @Post('/contact')
  @UseGuards(AuthGuard)
  updateUserContact(@Body() body: any, @Req() req: any) {
    const { tgId } = req.user;

    return this.userService.updateUserContact({
      ...body,
      tgId,
    });
  }
}
