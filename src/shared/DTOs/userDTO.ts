import { IsArray, IsEmail, IsNumber, IsNumberString, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';



export class UserDTO {
    @ApiModelProperty({
        maxLength:10,
        description:'Username'
    })
    @IsString()
    @Length(0, 10, {
        message: '長度需要小於十',
    })
    username: string;

    @ApiModelProperty({
        uniqueItems: true,
        description:'Email',
        maxLength: 100
    })
    @IsEmail()
    email: string;
    
    @ApiModelProperty()
    @IsNumber()
    depId: number;

    @ApiModelProperty({
        required: false,
        isArray:true,
        type: 'number',
    })
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    },
    {
        each: true,
    })
    roleIds: number[];
}
