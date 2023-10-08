import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import orderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

// Create new order
export const newOrder = catchAsyncError(
  async (data: any, next: NextFunction, res: Response) => {
    const order = await orderModel.create(data);

    res.status(201).json({ success: true, order });
  }
);
