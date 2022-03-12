import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/user/user.models';
import { UserRoles } from 'src/user/user-roles.model';

interface RoleCreateAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreateAttrs> {
    @ApiProperty({ example: '1', description: 'Id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Role name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @ApiProperty({ example: 'Administrator role', description: 'Role description' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;


    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}