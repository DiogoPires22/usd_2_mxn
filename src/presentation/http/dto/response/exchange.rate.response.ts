import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProviderResponse {
  constructor(value: number, last_updated: Date) {
    this.value = value;
    this.last_updated = last_updated;
  }
  @ApiProperty()
  value: number;
  @ApiProperty()
  last_updated: Date;
}

export class ExchangeRateResponse {
  constructor(
    banxico?: ProviderResponse,
    fixer?: ProviderResponse,
    diarioFederation?: ProviderResponse,
  ) {
    this.banxico = banxico;
    this.fixer = fixer;
    this.diarioFederation = diarioFederation;
  }
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
