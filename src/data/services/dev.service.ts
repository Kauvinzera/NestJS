import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

// -- implementação as configurações da Conexão com o Banco de dados Local - MySQL.

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
    type: this.configService.get<string>('DB_TYPE') as any,
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [Postagem, Tema, Usuario],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE'),
    };
  }
}