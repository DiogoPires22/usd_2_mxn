import { ApiProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: Array<string>;
  @ApiProperty()
  error?: string;
}
