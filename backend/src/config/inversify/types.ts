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
    AdminHospitalController: Symbol.for("AdminHospitalController"),

        // User
    UserRepository: Symbol.for("UserRepository"),
    UserAuthService: Symbol.for("UserAuthService"),
    UserController: Symbol.for("UserAuthController"),
    OtpRepository: Symbol.for("OtpRepository"),

// Donor (Separate User and Hospital)
  UserDonorService: Symbol.for("UserDonorService"),
  UserDonorRepository: Symbol.for("UserDonorRepository"),
  UserDonorController: Symbol.for("UserDonorController"),

  HospitalDonorService: Symbol.for("HospitalDonorService"),
  HospitalDonorRepository: Symbol.for("HospitalDonorRepository"),
  HospitalDonorController: Symbol.for("HospitalDonorController"),
    // DonorService: Symbol.for("DonorService"),
    // DonorRepository: Symbol.for("DonorRepository"),
    // DonorController: Symbol.for("DonorController"),
}
export default TYPES;