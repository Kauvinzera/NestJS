import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";

@Controller("/usuarios")
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard) // O decorator @UseGuards é usado para proteger o endpoint de login, garantindo que apenas usuários autenticados possam acessar essa rota. O LocalAuthGuard é um guard personalizado que implementa a estratégia de autenticação local, verificando as credenciais do usuário antes de permitir o acesso ao endpoint. SE REFERE A CLASSE QUE IMPLEMENTAMOS NA PASTA GUARDS
    @Post("/logar")
    @HttpCode(HttpStatus.OK)
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

}