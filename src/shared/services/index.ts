import { DepartmentService } from 'shared/services/deps.service';
import { RolesService } from '../../shared/services/role.service';
import { UsersService } from "./users.service";

export const servicesForUser = [
    UsersService,
    RolesService,
    DepartmentService,
]