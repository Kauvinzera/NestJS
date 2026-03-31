import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() { // função padrão da main.ts, que é o ponto de entrada da aplicação. Ela é responsável por criar a aplicação NestJS e iniciar o servidor HTTP. A função bootstrap
  const app = await NestFactory.create(AppModule); // Configuração da aplicação, onde o módulo raiz (AppModule) é passado como argumento para o método create do NestFactory. O NestFactory é uma classe fornecida pelo NestJS que é responsável por criar a aplicação e configurar os módulos, controllers e providers.

  process.env.TZ = '-03:00'; // define o fuso horário da aplicação para o horário de Brasília (GMT-3)

  app.useGlobalPipes(new ValidationPipe()); // habilita a validação global dos dados de entrada usando o class-validator. Isso permite que os DTOs (Data Transfer Objects) sejam validados automaticamente antes de serem processados pelos controllers.

  app.enableCors(); // habilita o CORS (Cross-Origin Resource Sharing) para permitir que a aplicação seja acessada por clientes de diferentes origens (domínios).

  await app.listen(process.env.PORT ?? 4000); // Executa a aplicação, iniciando o servidor HTTP e ouvindo as requisições na porta definida pela variável de ambiente PORT ou, se não estiver definida, na porta 4000.
}
bootstrap();
