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
import { DonorController as UserDonorController } from "../../controllers/user/donorController";
import { IDonorService } from "../../services/user/interface/IDonorService";
import { IDonorRepository } from "../../repositories/user/interface/IDonorRepository";
import { DonorService } from "../../services/user/donorService";
import { DonorRepository } from "../../repositories/user/donorRepository";
import { IDonorController as IHospitalDonorController } from "../../controllers/hospital/interface/IDonorController";
// import { IDonorController as IUserDonorController } from "../../controllers/user/interface/IDonorController";
import { DonorController as HospitalDonorController } from "../../controllers/hospital/donorController";
import { IUserDonorController } from "../../controllers/user/interface/IDonorController";

import { AdminDonorController } from "../../controllers/admin/adminDonorController";
import { IAdminDonorController } from "../../controllers/admin/interface/IAdminDonorController";
import { AdminDonorService } from "../../services/admin/adminDonorService"
import { IAdminDonorService } from"../../services/admin/interface/IAdminDonorService"
import { AdminDonorRepository } from "../../repositories/admin/adminDonorRepository";
import { IAdminDonorRepository} from "../../repositories/admin/interface/IAdminDonorRepository";
const container = new Container();
//admin  
container.bind<IAdminAuthService>(TYPES.AuthService).to(authService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)
container.bind<IAdminController>(TYPES.authController).to(authController)
container.bind<IAdminHospitalController>(TYPES.AdminHospitalController).to(AdminHospitalController);
//hospital
container.bind<IHospitalRepository>(TYPES.HospitalRepository).to(HospitalRepository)
container.bind<IHospitalAuthService>(TYPES.HospitalAuthService).to(HospitalAuthService)
container.bind<IHospitalController>(TYPES.HospitalController).to(HospitalController);
container.bind<IHospitalService>(TYPES.HospitalService).to(HospitalService);
// container.bind<IDonorController>(TYPES.DonorController).to(DonorController);
container.bind<IDonorService>(TYPES.HospitalDonorService).to(DonorService);
container.bind<IDonorRepository>(TYPES.HospitalDonorRepository).to(DonorRepository);
//user
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserAuthService>(TYPES.UserAuthService).to(UserAuthService);
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IOtpRepository>(TYPES.OtpRepository).to(OtpRepository);
// container.bind<DonorController>(TYPES.DonorController).to(DonorController);
container.bind<IDonorService>(TYPES.UserDonorService).to(DonorService);
container.bind<IDonorRepository>(TYPES.UserDonorRepository).to(DonorRepository);


container.bind<IHospitalDonorController>(TYPES.HospitalDonorController).to(HospitalDonorController);
container.bind<IUserDonorController>(TYPES.UserDonorController).to(UserDonorController);

container.bind<IAdminDonorService>(TYPES.AdminDonorService).to(AdminDonorService);
// container.bind<IDonorRepository>(TYPES.AdminDonorRepository).to(AdminDonorRepository);
container.bind<IAdminDonorRepository>(TYPES.AdminDonorRepository).to(AdminDonorRepository);
container.bind<IAdminDonorController>(TYPES.AdminDonorController).to(AdminDonorController);

export default container;