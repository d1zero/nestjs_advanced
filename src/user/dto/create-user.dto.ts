import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@email.test', description: 'Email' })
    @IsString({ message: 'Must be string' })
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string;

    @IsString({ message: 'Must be string' })
    @Length(4, 16, { message: 'password must be lenght between 4 and 16 symblos' })
    @ApiProperty({ example: 'VeryStrongPassword', description: 'password' })
    readonly password: string;
}