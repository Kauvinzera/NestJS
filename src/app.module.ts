import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kauavini2007*',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true
    }),
    PostagemModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// O módulo é a unidade básica de organização do código em NestJS. Ele é responsável por agrupar os controllers, providers e outros módulos relacionados a uma funcionalidade específica da aplicação. O módulo é definido usando o decorator @Module, que recebe um objeto de configuração com as seguintes propriedades: