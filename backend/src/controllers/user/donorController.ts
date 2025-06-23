// src/controllers/donorController.ts
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify/types";
import { IDonorService } from "../../services/user/interface/IDonorService";

@injectable()
export class DonorController {
  constructor(
    @inject(TYPES.DonorService) private donorService: IDonorService
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
}
