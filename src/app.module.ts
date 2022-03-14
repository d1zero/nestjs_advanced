import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./user/user.models";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { Role } from "./role/role.models";
import { UserRoles } from "./user/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Post } from "./post/post.models";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
            serveRoot: '/static'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Role, UserRoles, Post],
            autoLoadModels: true,
        }),
        UserModule,
        RoleModule,
        AuthModule,
        PostModule,
        FileModule,
    ],
})
export class AppModule { }