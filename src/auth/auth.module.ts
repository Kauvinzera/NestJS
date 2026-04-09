import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { jwtConstants } from "./constants/constant";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
 
@Module({
    imports: [forwardRef(() => UsuarioModule), // evitar o erro de referência circular, pois o UsuarioModule depende do AuthModule e vice-versa.
        PassportModule, //Precisamos desse módulo para implementar o pacote Passport e suas Strategies 
        JwtModule.register({//Precisamos para criar Token JWT
            secret: jwtConstants.secret, //A chave de assinatura secreta com o valor da propriedade secret da constante jwtConstants
            signOptions: { expiresIn: '1d' }, //Tempo de duração do token, no caso, 1 dia. Após esse período, o token se torna inválido e o usuário precisará fazer login novamente para obter um novo token válido.
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy], //Bcrypt se comporta como um service, por isso ele deve ser adicionado no array de providers do módulo AuthModule para que possa ser injetado em outros componentes da aplicação, como controllers ou outros services.
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};