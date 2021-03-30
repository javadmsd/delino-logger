import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<boolean> {
    const user = await this.repository.findOne({
      username: loginUserDto.username,
      password: loginUserDto.password,
    });

    if (!user) return false;
    return true;
  }
}
