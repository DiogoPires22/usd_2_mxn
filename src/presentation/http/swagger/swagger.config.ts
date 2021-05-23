import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfig {
  addApiDocs(app: INestApplication) {
    const opts = new DocumentBuilder()
      .setTitle('Exchange rate API')
      .setDescription(
        'WebAPI for integration with banxico, fixer and diariofederation',
      )
      .addBearerAuth()
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, opts);
    SwaggerModule.setup('api-docs', app, document);
  }
}
