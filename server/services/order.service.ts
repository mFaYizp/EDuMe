import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import orderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

// Create new order
export const newOrder = catchAsyncError(async (data: any, res: Response) => {
  const order = await orderModel.create(data);

  res.status(201).json({ success: true, order });
});

// get all orders
export const getAllOrderService = async (res: Response) => {
  const orders = await orderModel.find().sort({ createdAt: -1 });

  res.status(201).json({ success: true, orders });
};
