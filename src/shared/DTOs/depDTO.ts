import { IsString, MaxLength } from "class-validator";

export class DepartmentDTO {
    @IsString()
    @MaxLength(100)
    depName: string;
}