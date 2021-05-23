import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/presentation/http/strategies/JwtStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthzModule {}
