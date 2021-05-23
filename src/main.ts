import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './main/presentation.module';
import { HttpExceptionFilter } from './presentation/http/filter/exception.filters';
import { SwaggerConfig } from './presentation/http/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(PresentationModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.get(SwaggerConfig).addApiDocs(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
