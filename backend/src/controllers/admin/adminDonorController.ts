import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify/types";
import { IAdminDonorController } from "./interface/IAdminDonorController";
import { IAdminDonorService } from "../../services/admin/interface/IAdminDonorService";

@injectable()
export class AdminDonorController implements IAdminDonorController {
  constructor(
    @inject(TYPES.AdminDonorService) private adminDonorService: IAdminDonorService
  ) {}

  async getApprovedDonors(req: Request, res: Response): Promise<void> {
    try {
       const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

      const donors = await this.adminDonorService.getApprovedDonors({ page, limit, search });
      res.status(200).json(donors);
    } catch (error) {
      console.error("Error fetching approved donors", error);
      res.status(500).json({ message: "Failed to fetch approved donors" });
    }
  }

  async toggleDonorBlock(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isBlocked } = req.body;

      const updatedDonor = await this.adminDonorService.toggleDonorBlock(id, isBlocked);
      console.log("updatedDonor:",updatedDonor?.isBlocked);
      
      res.status(200).json(updatedDonor);
    } catch (error) {
      console.error("Error toggling donor status", error);
      res.status(500).json({ message: "Failed to toggle status" });
    }
  }
  async getDonorById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const donor = await this.adminDonorService.getDonorById(id);
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donor" });
  }
}

}
