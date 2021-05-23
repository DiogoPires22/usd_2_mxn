import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTokenRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  client_id: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  client_secret: string;
}
