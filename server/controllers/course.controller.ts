import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { catchAsyncError } from "../middleware/catchAsyncErrors";

//  upload Course

const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
