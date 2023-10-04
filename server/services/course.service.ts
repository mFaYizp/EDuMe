import { Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import courseModel from "../models/course.model";

// create Course

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({ success: true, course });
  }
);