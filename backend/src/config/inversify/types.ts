// import { authController } from "../../controllers/authController";

const TYPES={
    //services

    //admin
    AuthService:Symbol.for("AuthService"),
    AdminRepository: Symbol.for("AdminRepository"),
    authController:Symbol.for('athController')
}
export default TYPES;