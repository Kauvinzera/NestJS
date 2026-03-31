import { Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() // Classe de serviço
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>) { // Repository localizado no TypeORM é responsável por realizar as operações de CRUD (Create, Read, Update, Delete) no banco de dados. Ele é injetado no serviço para que possamos usar seus métodos para interagir com a tabela de postagens no banco de dados.
        } 

        // Método para buscar todas as postagens no banco de dados, async = Assíncrono, procura sem parar o código, e quando encontrar a resposta do banco de dados, retorna a lista de postagens.
    async findAll(): Promise<Postagem[]> { //Promisse = Prometendo que o retorno é uma lista de postagens
        return await this.postagemRepository.find(); // await = Esperando a resposta do banco de dados para retornar a lista de postagens. 

    }

}

