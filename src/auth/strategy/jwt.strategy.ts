import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constant";

// Primeiro, o Passport verifica se a assinatura do Token JWT recebido no cabeçalho da requisição é a mesma que foi definida na propriedade secret, da const jwtConstant, no arquivo constants.ts.
// Após validar a assinatura, o Passport decodifica o objeto JSON dentro do token, extraindo o objeto que contém o payload.
// Somente depois de concluir esses dois processos, o Passport executa o método validate(payload: any), que recebe o JSON decodificado contendo o payload.
// Ao retornar o payload no método validate(payload: any), estamos confirmando que o Token JWT foi validado. Caso necessário, você pode implementar outras lógicas adicionais.

// Responsavel por implementar a validação do token nos pontos protegidos pela aplicação

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extrai o token SWT do Cabeçalho da Requisição, onde o token é enviado como um Bearer Token no cabeçalho Authorization da requisição HTTP.
        ignoreExpiration: false, //bloqueia requisições com tokens expirados, retornado um HTTP Status UNAUTHORIZED 401.
        secretOrKey: jwtConstants.secret, //Chave de assinatura do Token JWT está armazenada no arquivo constants.ts na const jwtConstatnts, na propriedade secret
    })
}
    async validate(payload: any) {
        return payload;
    }

}
