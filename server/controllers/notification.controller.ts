import { NextFunction, Request, Response, request, response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import notificationModel from "../models/notification.model";
import ErrorHandler from "../utils/ErrorHandler";

// get all notifications ---admins only
export const getNotifications = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      res.status(201).json({ success: true, notifications });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
