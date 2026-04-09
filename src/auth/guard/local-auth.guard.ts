import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// A classe LocalAuthGuard é uma implementação personalizada da estratégia de autenticação local usando o Passport.js.

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

}