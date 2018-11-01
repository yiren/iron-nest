import { IsString, MaxLength } from "class-validator";

export class RoleDTO {
    @IsString()
    @MaxLength(100)
    roleName: string;
}