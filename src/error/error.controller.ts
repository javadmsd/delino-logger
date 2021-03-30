import { Body, Controller, Get, Post } from '@nestjs/common';

import { ErrorService } from './error.service';
import { ErrorInterface } from './error.interface';
import { CreateErrorDto } from './create-error.dto';

@Controller('error')
export class ErrorController {
  constructor(private errorService: ErrorService) {}

  @Post()
  async create(@Body() createErrorDto: CreateErrorDto): Promise<any> {
    this.errorService.create(createErrorDto);
  }

  @Get()
  async findAll(): Promise<ErrorInterface[]> {
    return this.errorService.findAll();
  }
}
