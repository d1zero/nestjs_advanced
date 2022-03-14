import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from '../user/user-roles.model';
import { User } from '../user/user.models';
import { RoleController } from './role.controller';
import { Role } from './role.models';
import { RoleService } from './role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles])
    ],
    exports: [RoleService]
})
export class RoleModule { }
