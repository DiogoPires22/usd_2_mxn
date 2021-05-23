import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProviderResponse {
  @ApiProperty()
  value: number;
  @ApiProperty()
  last_updated: Date;
}

export class ExchangeRateResponse {
  @ApiProperty({ type: ProviderResponse, name: 'banxico' })
  @ApiPropertyOptional()
  banxico: ProviderResponse;
  @ApiProperty({ type: ProviderResponse, name: 'diarioFederation' })
  @ApiPropertyOptional()
  diarioFederation: ProviderResponse;
  @ApiProperty({ type: ProviderResponse, name: 'fixer' })
  @ApiPropertyOptional()
  fixer: ProviderResponse;
}
