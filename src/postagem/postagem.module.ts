import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";
 
@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], // Importa o Postagem como uma entidade para o TypeORM, permitindo que o serviço de postagem possa usar o repositório do TypeORM para realizar as operações de CRUD no banco de dados.
    providers: [PostagemService], // Define o PostagemService como um provedor
    controllers: [PostagemController], // Define o PostagemController como um controlador, permitindo que ele possa lidar com as requisições HTTP relacionadas às postagens.
    exports: [TypeOrmModule] // Exporta o TypeOrmModule para que outros módulos possam usar o repositório do TypeORM para realizar as operações de CRUD no banco de dados.
})
export class PostagemModule {}