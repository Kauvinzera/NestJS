import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

// DML (Data Manipulation Language) - Linguagem de Manipulação de Dados, ou seja, a classe que define os métodos para manipular os dados da tabela do banco de dados, como buscar, criar, atualizar e deletar postagens.

@Injectable() // Classe de serviço
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,  // Repository localizado no TypeORM é responsável por realizar as operações de CRUD (Create, Read, Update, Delete) no banco de dados. Ele é injetado no serviço para que possamos usar seus métodos para interagir com a tabela de postagens no banco de dados.
        private temaService: TemaService) // Injeção de dependência do serviço de tema, com isso podemos acessar todos os métodos da TemaService dentro do PostagemService, ou seja, podemos usar os métodos do serviço para implementar a lógica da aplicação no serviço de postagem.
        {}

        // Método para buscar todas as postagens no banco de dados, async = Assíncrono, procura sem parar o código, e quando encontrar a resposta do banco de dados, retorna a lista de postagens.
    async findAll(): Promise<Postagem[]> { //Promisse = Prometendo que o retorno é uma lista de postagens
        return await this.postagemRepository.find({
            relations: {
                tema: true // relations = Permite que o TypeORM busque as postagens junto com os temas relacionados a cada postagem, ou seja, quando buscarmos as postagens, também teremos acesso aos temas relacionados a cada postagem.
            },

        }); // await = Esperando a resposta do banco de dados para retornar a lista de postagens. 

    }
        //Método para buscar uma postagem por ID no banco
    async findById(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true // relations = Permite que o TypeORM busque a postagem junto com o tema relacionado a essa postagem, ou seja, quando buscarmos uma postagem por ID, também teremos acesso ao tema relacionado a essa postagem.
            }
        });

        if(!postagem) {
                throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
            }
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // ILike = Busca por título ignorando maiúsculas e minúsculas, % = Coringa para buscar qualquer título que contenha a palavra-chave fornecida.
            }, 
            relations: {
                tema: true // relations = Permite que o TypeORM busque as postagens junto com os temas relacionados a cada postagem, ou seja, quando buscarmos as postagens por título, também teremos acesso aos temas relacionados a cada postagem.
            }
    });
}

    async create(postagem: Postagem): Promise<Postagem> {
        try {
            await this.temaService.findById(postagem.tema.id); // Verifica se o tema relacionado à postagem existe no banco de dados, se não existir, lança uma exceção HTTP 404 Not Found.
            return await this.postagemRepository.save(postagem); // save = Salva a postagem no banco de dados e retorna a postagem salva.
} catch (error) {
            throw new BadRequestException('Dados inválidos para criar postagem')
        }
    }
    async update(postagem: Postagem): Promise<Postagem> {
        let buscaPostagem: Postagem = await this.findById(postagem.id); // Busca a postagem no banco de dados com base no ID fornecido, se a postagem não for encontrada, lança uma exceção HTTP 404 Not Found.
        if (!buscaPostagem || !postagem.id) {
            throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
        } 
        try {
        await this.temaService.findById(postagem.tema.id); // Verifica se o tema relacionado à postagem existe no banco de dados, se não existir, lança uma exceção HTTP 404 Not Found.
        return await this.postagemRepository.save(postagem);
    } catch (error) {
        throw new BadRequestException('Dados inválidos para atualizar postagem')
    }

}
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.postagemRepository.delete(id);
}
}

