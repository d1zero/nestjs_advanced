import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../post/post.models';
import { AuthModule } from '../auth/auth.module';
import { Role } from '../role/role.models';
import { RoleModule } from '../role/role.module';
import { UserRoles } from './user-roles.model';
import { UserController } from './user.controller';
import { User } from './user.models';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Post]),
        RoleModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        UserService,
    ]
})
export class UserModule { }
