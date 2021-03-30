import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateErrorDto } from './create-error.dto';

import { Error } from './error.entity';
import { translate } from './error.helper';
import { ErrorStackInterface } from './error.interface';

@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(Error)
    private repository: Repository<Error>,

    @InjectConnection()
    private connection: Connection,
  ) {}

  findAll(): Promise<Error[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<ErrorStackInterface> {
    const error = await this.repository.findOne(id);

    let match;
    if ((match = /\((http.*?)\)/i.exec(error.stack))) {
      const sourceUrl = match[1];
      const result = await translate(sourceUrl);
      return { ...error, ...result };
    }
    return { ...error, originalFile: '', originalLines: [] };
  }

  async create(createErrorDto: CreateErrorDto): Promise<any> {
    const error = new Error();
    error.message = createErrorDto.message;
    error.stack = createErrorDto.stack;

    try {
      const result = await this.connection.manager.save(error);
      return `error log has been saved. error id is ${result.id}`;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
