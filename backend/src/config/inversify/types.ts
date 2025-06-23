// import { authController } from "../../controllers/authController";

const TYPES={
    //services

    //admin
    AuthService:Symbol.for("AuthService"),
    AdminRepository: Symbol.for("AdminRepository"),
    authController:Symbol.for('authController'),
    //hospirtal
    HospitalRepository: Symbol.for('HospitalRepository'),
    HospitalAuthService: Symbol.for('HospitalAuthService'),
    HospitalController: Symbol.for('HospitalAuthController'),
    HospitalService: Symbol("HospitalService"),

        // User
    UserRepository: Symbol.for("UserRepository"),
    UserAuthService: Symbol.for("UserAuthService"),
    UserController: Symbol.for("UserAuthController"),
    OtpRepository: Symbol.for("OtpRepository"),

    AdminHospitalController: Symbol.for("AdminHospitalController"),

}
export default TYPES;