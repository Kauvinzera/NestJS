import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../src/usuario/usuario.module';
import { AuthModule } from '../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PostagemModule } from '../src/postagem/postagem.module';
import { TemaModule } from '../src/tema/tema.module';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { Postagem } from '../src/postagem/entities/postagem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      autoLoadEntities: true, // 👈 deixa o Nest carregar tudo
      synchronize: true,
      dropSchema: true,
    }),

    JwtModule.register({
      secret: 'testsecret',
      signOptions: { expiresIn: '1h' },
    }),

    UsuarioModule,
    AuthModule,
    PostagemModule,
    TemaModule,
  ],
})
export class TestModule {}