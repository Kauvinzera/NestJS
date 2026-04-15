import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Usuario')
@Controller("/usuarios")
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard) // O decorator @UseGuards aplica o LocalAuthGuard nesta rota de login.
// Esse guard intercepta a requisição e valida as credenciais do usuário
// utilizando a estratégia local (username e password).
// Se as credenciais forem válidas, o acesso é permitido e o usuário é anexado à requisição.
    @Post("/logar")
    @HttpCode(HttpStatus.OK)
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

}