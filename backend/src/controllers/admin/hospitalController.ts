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
       const status = req.query.status as string || "";

      const result = await this.hospitalService.fetchHospitals({ page, limit, search,status });
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


async getPendingHospitals (req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

    const hospitals = await this.hospitalService.getPendingHospitals({page,limit,search});
    res.status(200).json(hospitals);
  } catch (error: any) {
    console.error("Error fetching pending hospitals:", error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};

async getHospitalById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const hospital = await this.hospitalService.getHospitalById(id);

    if (!hospital) {
      res.status(404).json({ message: "Hospital not found" });
      return;
    }

    res.status(200).json(hospital);
  } catch (error) {
    console.error("getHospitalById error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
async updateHospStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
       res.status(400).json({ message: "Invalid status" });
       return
    }

    const updated = await this.hospitalService.updateStatus(id, status);
    res.status(200).json(updated);
  } catch (error) {
    console.error("updateStatus error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

}
