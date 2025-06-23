// src/controllers/admin/adminHospitalController.ts
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../config/inversify/types";
import { IAdminHospitalController } from "./interface/IHospitalController"
import { IHospitalService } from "../../services/admin/interface/IHospitalService";

@injectable()
export class AdminHospitalController implements IAdminHospitalController {
  constructor(
    @inject(TYPES.HospitalService)
    private hospitalService: IHospitalService
  ) {}

  //  Fetch hospitals
  async fetchHospitals(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const result = await this.hospitalService.fetchHospitals({ page, limit, search });
      res.status(200).json(result);
    } catch (error) {
     console.error("Error in fetching hospitals:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  // ✅ Toggle block/unblock
  async toggleBlockStatus(req: Request, res: Response): Promise<void> {
    try {
      const hospitalId = req.params.id;
      const { isBlocked } = req.body;
      console.log("bode:",req.body);
      
      console.log("Updating block status to:", isBlocked);

      const updatedHospital = await this.hospitalService.toggleBlockStatus(hospitalId, isBlocked);
      res.status(200).json(updatedHospital);
    } catch (error) {
      console.error("Error in block:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
