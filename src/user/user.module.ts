import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/role/role.models';
import { RoleModule } from 'src/role/role.module';
import { UserRoles } from './user-roles.model';
import { UserController } from './user.controller';
import { User } from './user.models';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RoleModule,
    ],
    exports: [UserService]
})
export class UserModule { }
