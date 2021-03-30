import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { LoginUserDto } from './login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.login(loginUserDto);

    if (!result) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    return res.status(HttpStatus.OK).send();
  }
}
