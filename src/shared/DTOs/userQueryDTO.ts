import { IsNumber, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class UserQueryDTO{
    
    @ApiModelProperty({
        description:'username keyword',
    })
    @IsString()
    name: string;
    
    @ApiModelProperty({
        description:'Page No',
        default:1,
    })
    @IsNumber({})
    page: number;

    @ApiModelProperty({
        description:'Records Per Page',
        default:5,
    })
    @IsNumber()
    pageSize: number;
}