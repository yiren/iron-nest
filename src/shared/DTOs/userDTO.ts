import { IsEmail, IsString, Length } from 'class-validator';

export class UserDTO {
    @IsString()
    @Length(0, 10, {
        message: '長度需要小於十',
    })
    username: string;

    @IsEmail()
    email: string;
}