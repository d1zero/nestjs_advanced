import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../role/role.models';
import { User } from './user.models';


@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
    @ApiProperty({ example: '1', description: 'Id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    roleId: number;
}