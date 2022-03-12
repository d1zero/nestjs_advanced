import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./user/user.models";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { Role } from "./role/role.models";
import { UserRoles } from "./user/user-roles.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        UserModule,
        RoleModule,
    ],
})
export class AppModule { }