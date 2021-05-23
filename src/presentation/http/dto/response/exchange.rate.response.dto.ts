import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RateResponseDTO {
  @ApiProperty()
  value: number;
  @ApiProperty()
  last_updated: Date;
}

export class ExchangeRateResponseDTO {
  @ApiProperty({ type: RateResponseDTO, name: 'banxico' })
  @ApiPropertyOptional()
  banxico: RateResponseDTO;
  @ApiProperty({ type: RateResponseDTO, name: 'diarioFederation' })
  @ApiPropertyOptional()
  diarioFederation: RateResponseDTO;
  @ApiProperty({ type: RateResponseDTO, name: 'fixer' })
  @ApiPropertyOptional()
  fixer: RateResponseDTO;
}
