import express, { Request, Response } from "express";
import { NotAuthorizedError, requireAuth } from "@nody00org/common";
import { Order } from "../model/order";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "@nody00org/common";
const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidId) {
      throw new BadRequestError("Invalid Id");
    }

    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
