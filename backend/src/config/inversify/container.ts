import { Container } from "inversify";
import TYPES from "./types";


import { authService } from "../../services/admin/authService"
import { IAdminAuthService } from "../../services/admin/interface/IAuthService";
import { AdminRepository } from "../../repositories/admin/adminRepository";
import { IAdminRepository } from "../../repositories/admin/interface/IAdminRepository" 
import  {authController } from "../../controllers/admin/authController";
import { IAdminController } from "../../controllers/admin/interface/IAuthController";
import { IAdminHospitalController } from "../../controllers/admin/interface/IHospitalController";
import { AdminHospitalController } from "../../controllers/admin/hospitalController";

import { HospitalRepository } from "../../repositories/hospital/hospitalRepository";
import { IHospitalRepository } from "../../repositories/hospital/interface/IHospitalRepository";
import { HospitalAuthService } from "../../services/hospital/authService";
import { IAuthService as IHospitalAuthService} from "../../services/hospital/interface/IAuthService";
import { IHospitalController } from "../../controllers/hospital/interface/IHospitalController";
import { HospitalController } from "../../controllers/hospital/hospitalController";

import { IUserRepository } from "../../repositories/user/interface/IUserRepository";
import { UserAuthService } from "../../services/user/authService";
import { IUserAuthService } from "../../services/user/interface/IAuthService";
import { UserController } from "../../controllers/user/userController";
import { IUserController } from "../../controllers/user/interface/IUserController";
import { UserRepository } from "../../repositories/user/userRepository";
import { OtpRepository } from "../../repositories/otp/otpRepository";
import { IOtpRepository } from "../../repositories/otp/interface/IOtpRepository";
import { IHospitalService } from "../../services/admin/interface/IHospitalService";
import { HospitalService } from "../../services/admin/hospitalService";


const container = new Container();
  
container.bind<IAdminAuthService>(TYPES.AuthService).to(authService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)
container.bind<IAdminController>(TYPES.authController).to(authController)
container.bind<IAdminHospitalController>(TYPES.AdminHospitalController).to(AdminHospitalController);

container.bind<IHospitalRepository>(TYPES.HospitalRepository).to(HospitalRepository)
container.bind<IHospitalAuthService>(TYPES.HospitalAuthService).to(HospitalAuthService)
container.bind<IHospitalController>(TYPES.HospitalController).to(HospitalController);
container.bind<IHospitalService>(TYPES.HospitalService).to(HospitalService);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserAuthService>(TYPES.UserAuthService).to(UserAuthService);
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IOtpRepository>(TYPES.OtpRepository).to(OtpRepository);

export default container;