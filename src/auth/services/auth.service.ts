import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsuarioLogin } from "../entities/usuariologin.entity";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private bcrypt: Bcrypt,
        private jwtService: JwtService
    ) { // Injeção de dependências: O construtor da classe AuthService recebe três parâmetros: usuarioService, bcrypt e jwtService. Esses parâmetros são injetados automaticamente pelo NestJS, permitindo que a AuthService utilize os métodos e funcionalidades desses serviços para realizar suas operações de autenticação e geração de tokens JWT.
    }
    async validateUser(usuario: string, senha: string): Promise<any> { //Usa o metodo de compararSenha criada no bcrypt
        
        const buscaUsuario = await this.usuarioService.findByUsuario(usuario);

        if (!buscaUsuario) {
            throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);
        }

        const senhaValida = await this.bcrypt.compararSenha(senha, buscaUsuario.senha);

        if (buscaUsuario && senhaValida) {
            const {senha, ... resposta} = buscaUsuario; // A desestruturação extrai a propriedade senha do objeto buscaUsuario e armazena o restante das propriedades em um novo objeto chamado resposta.  Coleta todos os demais atributos do objeto buscaUsuario, que não foram explicitamente desestruturados (neste caso, todos os atributos, menos senha) e as coloca no objeto resposta
            // ... resposta armazena o restante das propriedades do objeto buscaUsuario, exceto a senha, que é omitida por questões de segurança. Dessa forma, a resposta retornada para o cliente não incluirá a senha do usuário, protegendo assim as informações sensíveis.
            
            return resposta;
        }
        return null;
    }
    async login(usuarioLogin: UsuarioLogin) {
    const payload = {sub: usuarioLogin.usuario};

    const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);
    
    return {
        id: buscaUsuario?.id,
        nome: buscaUsuario?.nome,
        usuario: usuarioLogin.usuario,
        senha: '',
        foto: buscaUsuario?.foto,
        token: `Bearer ${this.jwtService.sign(payload)}`,
    }
}
}