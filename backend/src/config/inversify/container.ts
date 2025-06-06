import { Container } from "inversify";
import TYPES from "./types";

//imp
import { authService } from "../../services/admin/authService"
import { IAdminAuthService } from "../../services/admin/interface/IAuthService";

import { AdminRepository } from "../../repositories/admin/adminRepository";
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository" 

import  {authController } from "../../controllers/admin/authController";
import { IAdminController } from "../../controllers/admin/interface/IAuthController";

import { HospitalRepository } from "../../repositories/hospital/hospitalRepository";
import { IHospitalRepository } from "../../repositories/hospital/interface/IHospitalRepository";

import { HospitalAuthService } from "../../services/hospital/authService";
import { IAuthService } from "../../services/hospital/interface/IAuthService";
import { IHospitalController } from "../../controllers/hospital/interface/IHospitalController";
import { HospitalController } from "../../controllers/hospital/hospitalController";

const container = new Container();
  
container.bind<IAdminAuthService>(TYPES.AuthService).to(authService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)
container.bind<IAdminController>(TYPES.authController).to(authController)

container.bind<IHospitalRepository>(TYPES.HospitalRepository).to(HospitalRepository)
container.bind<IAuthService>(TYPES.HospitalAuthService).to(HospitalAuthService)
container.bind<IHospitalController>(TYPES.HospitalController).to(HospitalController);


export default container;