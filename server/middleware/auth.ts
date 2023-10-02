import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

export const isAuthenticated = catchAsyncError(async(req:Request,res:Response,next: NextFunction)=>{
    const access_token = req.cookies.access_token

    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource",400))
    }
}) 