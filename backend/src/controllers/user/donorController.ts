// src/controllers/donorController.ts
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify/types";
import { IDonorService } from "../../services/user/interface/IDonorService";
import { IUserDonorController } from "./interface/IDonorController";
import { AuthRequest } from "../../types/common/middType";
// import { AuthRequest } from "../../types/common/middType";

@injectable()
export class DonorController implements IUserDonorController{
  constructor(
    @inject(TYPES.UserDonorService) private donorService: IDonorService
  ) {}

  async handleDonorRequest(req: AuthRequest, res: Response): Promise<void> {
    try {
       const donorData = {
      ...req.body,
      user: req.user?.id,  // ✅ Inject the authenticated user ID
    };
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
async getMyDonorRequest(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      console.log("[getMyDonorRequest] req.user:", req.user);
     console.log("userid:",userId);
     
      if (!userId) {
         res.status(401).json({ message: "Unauthorized" });
         return
      }

      const donorRequest = await this.donorService.getMyDonorRequest(userId);
console.log("[getMyDonorRequest] donorRequest:", donorRequest);
      if (!donorRequest) {
         res.status(404).json({ message: "No donor request found" });
         return
      }

      res.json(donorRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
async cancelDonorRequest(req: AuthRequest, res: Response): Promise<void> {
  try {
    const requestId = req.params.id;
    const userId = req.user?.id;

    
    if (!requestId) {
       res.status(400).json({ message: "Request ID is required." });
       return
    }
    if (!userId) {
       res.status(401).json({ message: "Unauthorized: User ID missing." });
       return
    }
    await this.donorService.cancelDonorRequest(requestId, userId);

    res.status(200).json({ message: "Donor request cancelled successfully." });
  } catch (error: any) {
    console.error("Error cancelling donor request:", error.message);
    res.status(500).json({ message: "Failed to cancel donor request." });
  }
}

}
