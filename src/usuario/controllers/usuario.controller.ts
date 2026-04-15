import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
 
@ApiTags("Usuario")
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController{
 
    constructor(private readonly usuarioService: UsuarioService){ }
    
    @UseGuards(JwtAuthGuard) // protegido pelo token
    @Get('/all') // endpoint para listar todos os usuários
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }
 
    @UseGuards(JwtAuthGuard) // protegido pelo token
    @Get('/:id') // endpoint para listar um usuário específico por ID, usando o decorator @Param para extrair o parâmetro de rota "id" e o ParseIntPipe para garantir que o valor seja convertido para um número inteiro antes de ser passado para o método findById do serviço.
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }
 
    @Post('/cadastrar') // endpoint para criar um novo usuário, usando o decorator @Body para extrair os dados do corpo da requisição e passá-los para o método create do serviço. O decorator @HttpCode(HttpStatus.CREATED) é usado para indicar que a resposta deve ter o status HTTP 201 Created, indicando que um novo recurso foi criado com sucesso.
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }
    
    @UseGuards(JwtAuthGuard) // protegido pelo token
    @Put('/atualizar') // endpoint para atualizar um usuário existente, usando o decorator @Body para extrair os dados do corpo da requisição e passá-los para o método update do serviço. O decorator @HttpCode(HttpStatus.OK) é usado para indicar que a resposta deve ter o status HTTP 200 OK, indicando que a atualização foi realizada com sucesso.
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }
 
}