import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"; // importada da biblioteca passport-jwt
import { AuthService } from "../services/auth.service";

// A classe LocalStrategy é uma implementação personalizada da estratégia de autenticação local usando o Passport.js. 
// Ela estende a classe PassportStrategy, que é fornecida pelo pacote @nestjs/passport
// Utiliza a estratégia de autenticação local (passport-local) para validar as credenciais do usuário durante o processo de login. 
// A LocalStrategy é responsável por verificar se as credenciais fornecidas pelo usuário correspondem a um usuário válido no sistema,
// Utilizando o AuthService para realizar essa validação. Se as credenciais forem válidas, a estratégia retorna o usuário autenticado; caso contrário, lança uma exceção UnauthorizedException indicando que as credenciais são inválidas.

//Autenticação através de email e senha

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private _usernameField: string;
    private _passwordField: string;

    constructor(private readonly authService: AuthService) {
        super(); 
        this._usernameField = 'usuario';
        this._passwordField = 'senha';
    }

    async validate(usuario: string, senha: string): Promise<any> { //Usa o método no service de validar o usuário
        const validaUsuario = await this.authService.validateUser(usuario, senha);
        if (!validaUsuario) {
            throw new UnauthorizedException("Usuário e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}
