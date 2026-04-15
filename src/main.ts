import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() { // função padrão da main.ts, que é o ponto de entrada da aplicação. Ela é responsável por criar a aplicação NestJS e iniciar o servidor HTTP. A função bootstrap
  const app = await NestFactory.create(AppModule); // Configuração da aplicação, onde o módulo raiz (AppModule) é passado como argumento para o método create do NestFactory. O NestFactory é uma classe fornecida pelo NestJS que é responsável por criar a aplicação e configurar os módulos, controllers e providers.

  const config = new DocumentBuilder() //Documentação Swagger com alguns parametros
  .setTitle('Blog Pessoal') //Título do projeto
  .setDescription('Projeto Kauã Vinícius Sabino de Moraes Blog Pessoal') //Breve Descrição do projeto 
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com") // contato do projeto
  .setVersion('1.0')// versão do projeto
  .addBearerAuth() // solicitação de autenticação do usuário
  .build(); //Constrói a página do Swagger com todos os Parâmetros acima, através do Método build().
  const document = SwaggerModule.createDocument(app, config);//criação do Módulo do Swagger com os parâmetros app e config
  SwaggerModule.setup('/swagger', app, document); //Configura o endpoint do Swagger, através do Método setup() com o Endpoint swagger, Aplicação app, e Documentação document

  process.env.TZ = '-03:00'; // define o fuso horário da aplicação para o horário de Brasília (GMT-3)

  app.useGlobalPipes(new ValidationPipe()); // habilita a validação global dos dados de entrada usando o class-validator. Isso permite que os DTOs (Data Transfer Objects) sejam validados automaticamente antes de serem processados pelos controllers.

  app.enableCors(); // habilita o CORS (Cross-Origin Resource Sharing) para permitir que a aplicação seja acessada por clientes de diferentes origens (domínios).

  await app.listen(process.env.PORT ?? 4000); // Executa a aplicação, iniciando o servidor HTTP e ouvindo as requisições na porta definida pela variável de ambiente PORT ou, se não estiver definida, na porta 4000.
}
bootstrap();
