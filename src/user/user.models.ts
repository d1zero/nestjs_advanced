import { Model, Table, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../role/role.models';
import { UserRoles } from './user-roles.model';
import { Post } from '../post/post.models';

interface UserCreateAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttrs> {
    @ApiProperty({ example: '1', description: 'Id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@email.test', description: 'Email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'VeryStrongPassword', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'true', description: 'Banned or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'Explicit words', description: 'Ban reason' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}