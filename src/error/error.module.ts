import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { Error } from './error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Error])],
  providers: [ErrorService],
  controllers: [ErrorController],
})
export class ErrorModule {}
