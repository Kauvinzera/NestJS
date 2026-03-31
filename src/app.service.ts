import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// regra de negócio, ou seja, a lógica da aplicação, deve ser implementada no service, e não no controller. O controller é responsável apenas por receber as requisições e retornar as respostas, enquanto o service é responsável por implementar a lógica da aplicação. 