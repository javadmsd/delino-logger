import { ApiProperty } from '@nestjs/swagger';

export class CreateErrorDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  stack: string;
}
