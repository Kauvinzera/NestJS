import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";

@Controller('temas') // Define a rota base do controller. Indica que a classe é um RestController, ou seja, será responsável receber e processar as requisições HTTP relacionas ao recurso Tema
export class TemaController {
    constructor(private readonly temaService: TemaService) {}// Injeção de dependência do serviço de tema, com isso podemos acessar todos os métodos da TemaService dentro do TemaController, ou seja, podemos usar os métodos do serviço para implementar a lógica da aplicação no controller.

    @Get() 
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll(); // Chama o método findAll do serviço de tema para buscar todas os temas no banco de dados e retornar a lista de temas.
    }

    @Get("/:id")
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
        return this.temaService.findById(id); // Chama o método findById do serviço de tema para buscar um tema específico no banco de dados com base no ID fornecido e retornar o tema encontrado. 
    }

    @Get("/descricao/:descricao")
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param("descricao") descricao: string): Promise<Tema[]> {
        return this.temaService.findByDescricao(descricao); // Chama o método findByDescricao do serviço de tema para buscar os temas no banco de dados com base na descrição fornecida e retornar a lista de temas encontrados.
    }    

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema); // Chama o método create do serviço de tema para criar um novo tema no banco de dados com base nos dados fornecidos no corpo da requisição e retornar o tema criado.
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.temaService.delete(id);
    }

}
