// src/controllers/donorController.ts
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify/types";
import { IDonorService } from "../../services/user/interface/IDonorService";
import { IDonorController } from "./interface/IDonorController";

@injectable()
export class DonorController implements IDonorController{
  constructor(
    @inject(TYPES.HospitalDonorService) private donorService: IDonorService
  ) {}

  // Handle donor form submission
  async handleDonorRequest(req: Request, res: Response): Promise<void> {
    try {
      const donorData = req.body;
      console.log("req-body", donorData);
      const savedDonor = await this.donorService.createDonorRequest(donorData);
      res.status(201).json(savedDonor);
    } catch (err: any) {
      console.error("Error in donor request:", err.message);
      res.status(500).json({ message: "Failed to submit donor request." });
    }
  }

  // Get all donor requests (for admin or hospital)
  async getAllDonorRequests(_req: Request, res: Response): Promise<void> {
    try {
      const donors = await this.donorService.getAllRequests();
      res.status(200).json(donors);
    } catch (error: any) {
      console.error("Error fetching donors:", error.message);
      res.status(500).json({ message: "Failed to fetch donor requests." });
    }
  }
 async getSingleReqDonor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const donor = await this.donorService.getSingleReqDonor(id);

      if (!donor) {
        res.status(404).json({ message: "Donor not found" });
        return;
      }

      res.status(200).json(donor);
    } catch (error: any) {
      console.error("Error fetching donor by ID:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
  // Update status: accept/reject a donor request
  async updateDonorStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedDonor = await this.donorService.updateDonorStatus(id, status);
       if (!updatedDonor) {
      res.status(404).json({ message: "Donor not found" });
      return;
    }

    res.status(200).json(updatedDonor);
    } catch (err: any) {
      console.error("Error updating donor status:", err.message);
      res.status(500).json({ message: "Failed to update status" });
    }
  }
}
