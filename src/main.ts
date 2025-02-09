import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { PORT } from 'src/utils'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('City API')
    .setDescription('API Docs - City API')
    .setVersion('1.0')
    .build()

  app.enableCors({ origin: 'http://localhost:8000', methods: 'GET' })

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api-docs', app, document)
  await app.listen(PORT)
}

bootstrap()
