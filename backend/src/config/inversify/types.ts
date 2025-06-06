// import { authController } from "../../controllers/authController";

const TYPES={
    //services

    //admin
    AuthService:Symbol.for("AuthService"),
    AdminRepository: Symbol.for("AdminRepository"),
    authController:Symbol.for('authController'),
    HospitalRepository: Symbol.for('HospitalRepository'),
    HospitalAuthService: Symbol.for('HospitalAuthService'),
    HospitalController: Symbol.for('HospitalAuthController')
}
export default TYPES;