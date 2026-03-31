import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
 
@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], // Importa o Postagem como uma entidade para o TypeORM, permitindo que o serviço de postagem possa usar o repositório do TypeORM para realizar as operações de CRUD no banco de dados.
    providers: [PostagemService], // Define o PostagemService como um provedor
    controllers: [PostagemController],
    exports: [TypeOrmModule] // Exporta o TypeOrmModule para que outros módulos possam usar o repositório do TypeORM para realizar as operações de CRUD no banco de dados.
})
export class PostagemModule {}