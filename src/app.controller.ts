import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// O controller é responsável por receber as requisições e retornar as respostas. Ele é definido usando o decorator @Controller, que pode receber um caminho como argumento para definir a rota base do controller. Os métodos do controller são decorados com os decorators de método HTTP (@Get, @Post, @Put, @Delete, etc.) para definir as rotas específicas para cada método. O controller deve ser injetado com os serviços necessários para implementar a lógica da aplicação.