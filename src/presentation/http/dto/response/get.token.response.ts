import { ApiProperty } from '@nestjs/swagger';

export class GetTokenResponse {
  @ApiProperty()
  access_token: string;

  static create(accessToken: string): GetTokenResponse {
    const t = new GetTokenResponse();
    t.access_token = accessToken;
    return t;
  }
}
