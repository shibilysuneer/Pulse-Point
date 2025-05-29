import { Container } from "inversify";
import TYPES from "./types";

//imp
import { authService } from "../../services/admin/authService"
import { IAdminAuthService } from "../../services/admin/interface/IAuthService";

import { AdminRepository } from "../../repositories/admin/adminRepository";
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository" 

import { authController } from "../../controllers/authController";
import { IAdminController } from "../../controllers/admin/interface/IAuthController";

const container = new Container();
  
container.bind<IAdminAuthService>(TYPES.AuthService).to(authService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)
container.bind<IAdminController>(TYPES.authController).to(authController)


export default container;