import { BadRequestException, Delete, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable() // Classe de serviço
export class TemaService {

    constructor( 
    @InjectRepository(Tema) // Repository localizado no TypeORM é responsável por realizar as operações de CRUD (Create, Read, Update, Delete) no banco de dados. Ele é injetado no serviço para que possamos usar seus métodos para interagir com a tabela de temas no banco de dados.
    private temaRepository: Repository<Tema>) {
    }

    async findAll(): Promise<Tema[]> { //Promisse = Prometendo que o retorno é uma lista de temas
        return await this.temaRepository.find({
            relations: {
                postagens: true // relations = Permite que o TypeORM busque os temas junto com as postagens relacionadas a cada tema, ou seja, quando buscarmos os temas, também teremos acesso às postagens relacionadas a cada tema.
            }
        }); // await = Esperando a resposta do banco de dados para retornar a lista de temas.
    }

    async findById(id: number): Promise<Tema> {
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagens: true // relations = Permite que o TypeORM busque o tema junto com as postagens relacionadas a esse tema, ou seja, quando buscarmos um tema por ID, também teremos acesso às postagens relacionadas a esse tema.
            }
        });
        if(!tema) {
            throw new HttpException("Tema não encontrado", HttpStatus.NOT_FOUND);
        }
        return tema;
}

    async findByDescricao(descricao: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) // ILike = Busca por descrição ignorando maiúsculas e minúsculas, % = Coringa para buscar qualquer descrição que contenha a palavra-chave fornecida.
            },
            relations: {
                postagens: true // relations = Permite que o TypeORM busque os temas junto com as postagens relacionadas a cada tema, ou seja, quando buscarmos os temas por descrição, também teremos acesso às postagens relacionadas a cada tema.
            }
        })
}

    async create(tema: Tema): Promise<Tema> {
        try {return await this.temaRepository.save(tema); // save = Salva o tema no banco de dados e retorna o tema salvo.
    } catch (error) {
        throw new BadRequestException('Dados inválidos para criar tema')
    }
}

    async update(tema: Tema): Promise<Tema> {
        let buscaTema: Tema = await this.findById(tema.id); // Busca o tema no banco de dados com base no ID fornecido, se o tema não for encontrado, lança uma exceção HTTP 404 Not Found.
        if (!buscaTema || !tema.id) {
            throw new HttpException("Tema não encontrado", HttpStatus.NOT_FOUND);
        }
        try {
        return await this.temaRepository.save(tema);
        } catch (error) {
            throw new BadRequestException('Dados inválidos para atualizar tema')
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.temaRepository.delete(id);
    }
}