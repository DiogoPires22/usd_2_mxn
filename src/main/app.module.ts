import { Module } from '@nestjs/common';
import { AppController } from '../presentation/http/controller/app.controller';
import { InfraModule } from './infra.module';

@Module({
  imports: [InfraModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
