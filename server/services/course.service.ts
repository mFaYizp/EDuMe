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

// get all courses

export const getAllCourseService = async (res: Response) => {
  
  const courses = await courseModel.find().sort({ createdAt: -1 });

  res.status(201).json({ success: true, courses });
};
