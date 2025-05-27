import { Container } from "inversify";
import TYPES from "./types";

import { AuthService } from "../../services/admin/authService";
import { IAdminAuthService } from "../../services/admin/interface/IAuthService";

import { AdminRepository } from "../../repositories/admin/adminRepository";
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository" 

const container = new Container();
  
container.bind<IAdminAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)


export default container;