import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint() //não iremos precisar deste endpoint no Swagger
  @Get()
  async redirect(@Res() resposta: any) { //@Res recebe resposta da Requisição Get, sendo inserida na resposta
    return resposta.redirect("/swagger"); //redirecionar a Requisição para o endpoint do Swagger (/swagger). Desta forma, toda a vez que uma Requisição do tipo GET chegar na aplicação apontando para o endereço principal: http://localhost:4000/, ela será encaminhada para o endereço do Swagger: http://localhost:4000/swagger/.
  }
}

// O controller é responsável por receber as requisições e retornar as respostas. Ele é definido usando o decorator @Controller, que pode receber um caminho como argumento para definir a rota base do controller. Os métodos do controller são decorados com os decorators de método HTTP (@Get, @Post, @Put, @Delete, etc.) para definir as rotas específicas para cada método. O controller deve ser injetado com os serviços necessários para implementar a lógica da aplicação.