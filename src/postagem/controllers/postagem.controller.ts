import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller('postagens') // Define a rota base do controller. Indica que a classe é um RestController, ou seja, será responsável receber e processar as requisições HTTP relacionas ao recurso Postagem
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) {}// Injeção de dependência do serviço de postagem, com isso podemos acessar todos os métodos da PostagemService dentro do PostagemController, ou seja, podemos usar os métodos do serviço para implementar a lógica da aplicação no controller.

    @Get() // Define a rota para o método findAll, ou seja, quando uma requisição GET for feita para a rota 'postagens', esse método será chamado.
    @HttpCode(HttpStatus.OK) // Define o código de status HTTP para a resposta, nesse caso, 200 OK.
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll(); // Chama o método findAll do serviço de postagem para buscar todas as postagens no banco de dados e retornar a lista de postagens.
    }

}