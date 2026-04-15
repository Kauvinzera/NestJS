import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({ 
    type: process.env.DB_TYPE as 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
      entities: [Postagem, Tema, Usuario], // chama as entidades que criamos para que o TypeORM possa criar as tabelas correspondentes no banco de dados.
      synchronize: process.env.DB_SYNCHRONIZE === 'true'
    }),
    PostagemModule, 
    TemaModule,
    AuthModule,
    UsuarioModule // importa o módulo de usuário para que ele possa ser utilizado em outros módulos da aplicação, como o módulo de autenticação, onde será necessário acessar os dados dos usuários para realizar a autenticação e autorização.
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}

// O módulo é a unidade básica de organização do código em NestJS. Ele é responsável por agrupar os controllers, providers e outros módulos relacionados a uma funcionalidade específica da aplicação. O módulo é definido usando o decorator @Module, que recebe um objeto de configuração com as seguintes propriedades: