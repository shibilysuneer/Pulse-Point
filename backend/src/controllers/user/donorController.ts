// src/controllers/donorController.ts
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify/types";
import { IDonorService } from "../../services/user/interface/IDonorService";
import { IUserDonorController } from "./interface/IDonorController";

@injectable()
export class DonorController implements IUserDonorController{
  constructor(
    @inject(TYPES.UserDonorService) private donorService: IDonorService
  ) {}

  async handleDonorRequest(req: Request, res: Response): Promise<void> {
    try {
      const donorData = req.body;
      console.log("req-body",donorData);
      
      const savedDonor = await this.donorService.createDonorRequest(donorData);
      res.status(201).json(savedDonor);
    } catch (err: any) {
      console.error("Error in donor request:", err.message);
      res.status(500).json({ message: "Failed to submit donor request." });
    }
  }

  async getAllDonorRequests(_req: Request, res: Response): Promise<void> {
    try {
      const donors = await this.donorService.getAllRequests();
      res.status(200).json(donors);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch donor requests." });
    }
  }

  async updateDonorStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await this.donorService.updateDonorStatus(id, status);
      res.status(200).json(updated);
    } catch (err: any) {
      console.error("Error updating donor status:", err.message);
      res.status(500).json({ message: "Failed to update status" });
    }
  }
}
