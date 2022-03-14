import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.models';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async login(userDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async register(userDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return { token: this.jwtService.sign(payload) }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Incorrect email or password' })
    }
}
