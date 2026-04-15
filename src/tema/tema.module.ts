import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./services/tema.service";
import { TemaController } from "./controllers/tema.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Tema])], // Importa o módulo do TypeORM para a entidade Tema, ou seja, o módulo do TypeORM é responsável por criar a tabela no banco de dados e realizar as operações de CRUD (Create, Read, Update, Delete) na tabela do banco de dados.
    controllers: [TemaController], // Define o TemaController como um controlador, permitindo que ele possa lidar com as requisições HTTP relacionadas aos temas.
    providers: [TemaService], // Define o TemaService como um provedor, permitindo que ele possa ser injetado em outros componentes do NestJS, como controladores e outros serviços.
    exports: [TemaService] // Exporta o TemaService para que ele possa ser usado em outros módulos, ou seja, o módulo do TypeORM é responsável por criar a tabela no banco de dados e realizar as operações de CRUD (Create, Read, Update, Delete) na tabela do banco de dados.
})
export class TemaModule {}