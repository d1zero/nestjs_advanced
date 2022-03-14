import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'secret',
            signOptions: { expiresIn: '24h' },
        })],
    exports: [
        AuthService,
        JwtModule,
    ]
})
export class AuthModule { }
