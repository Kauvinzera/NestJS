import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

// -- Porta de entrada para requisições HTTP relacionadas ao recurso Postagem, ou seja, é responsável por receber e processar as requisições HTTP relacionadas às postagens, como buscar todas as postagens, criar uma nova postagem, atualizar uma postagem existente e deletar uma postagem.

@Controller('postagens') // Define a rota base do controller. Indica que a classe é um RestController, ou seja, será responsável receber e processar as requisições HTTP relacionas ao recurso Postagem
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) {}// Injeção de dependência do serviço de postagem, com isso podemos acessar todos os métodos da PostagemService dentro do PostagemController, ou seja, podemos usar os métodos do serviço para implementar a lógica da aplicação no controller.

    @Get() // Define a rota para o método findAll, ou seja, quando uma requisição GET for feita para a rota 'postagens', esse método será chamado.
    @HttpCode(HttpStatus.OK) // Define o código de status HTTP para a resposta, nesse caso, 200 OK.
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll(); // Chama o método findAll do serviço de postagem para buscar todas as postagens no banco de dados e retornar a lista de postagens.
    }

    @Get("/:id")
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> { // ParseIntPipe = converte id para número, garantindo que o id seja number, caso contrário, lança uma exceção HTTP 400 Bad Request.
        return this.postagemService.findById(id); // Chama o método findById do serviço de postagem para buscar uma postagem específica no banco de dados com base no ID fornecido e retornar a postagem encontrada.
    }

        @Get("/titulo/:titulo")
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("titulo") titulo: string): Promise<Postagem[]> { // Param = Extrai o parâmetro "titulo" da rota, ou seja, quando uma requisição GET for feita para a rota 'postagens/titulo/:titulo', esse método será chamado e o valor do parâmetro "titulo" será passado para o método findByTitulo como argumento.
        return this.postagemService.findByTitulo(titulo);
    }

    @Post() // Define a rota para o método create, ou seja, quando uma requisição POST for feita para a rota 'postagens', esse método será chamado.
    @HttpCode(HttpStatus.CREATED) // Define o código de status HTTP para a resposta, nesse caso, 201 Created.
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);

    }

    // Param = Extrai o que o usuário digitou na rota e insere o valor no parâmetro desejado, transforma de string para number, ou a tipagem adequada
}