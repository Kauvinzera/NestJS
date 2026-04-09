import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

//criptografar a senha do usuário antes de armazená-la no banco de dados, garantindo que mesmo que o banco de dados seja comprometido, as senhas dos usuários permaneçam protegidas. Além disso, a função compararSenha é usada para verificar se a senha digitada pelo usuário corresponde à senha armazenada no banco de dados durante o processo de autenticação.
//comparar a senha digitada pelo usuário com a senha armazenada no banco de dados, garantindo que o processo de autenticação seja seguro e confiável. Dessa forma, a classe Bcrypt desempenha um papel fundamental na segurança da aplicação, protegendo as senhas dos usuários e garantindo que apenas usuários autenticados possam acessar recursos protegidos.

@Injectable()
export class Bcrypt {

    async criptografarSenha(senha: string): Promise<string> {
    
        let saltos: number = 10;
        return await bcrypt.hash(senha, saltos); // bcrypt.hash(senha, saltos) é uma função que recebe a senha e o número de saltos (rounds) para gerar um hash seguro. O resultado é uma string criptografada que pode ser armazenada no banco de dados.
    }

    async compararSenha(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);// bcrypt.compare(senhaDigitada, senhaBanco) é uma função que compara a senha digitada pelo usuário com a senha armazenada no banco de dados. Ela retorna true se as senhas coincidirem e false caso contrário.
    }

}