import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.models';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RoleService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } })
        return users
    }
}
