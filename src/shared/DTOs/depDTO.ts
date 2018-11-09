import { IsString, MaxLength } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class DepartmentDTO {
    @ApiModelProperty({
        description:'Deparmtent Name',
        maxLength:100
    })
    @IsString()
    @MaxLength(100)
    depName: string;
}