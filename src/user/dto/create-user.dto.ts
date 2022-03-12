import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: 'user@email.test', description: 'Email' })
    readonly email: string;
    @ApiProperty({ example: 'VeryStrongPassword', description: 'password' })
    readonly password: string;
}