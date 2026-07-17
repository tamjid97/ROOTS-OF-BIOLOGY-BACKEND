import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";


const poseNewPdf = catchAsync((req: Request, res: Response, next: NextFunction)=>{

})

const updatePdf = catchAsync((req: Request, res: Response, next: NextFunction)=>{

})

const deletePdf = catchAsync((req: Request, res: Response, next: NextFunction)=>{

})


export const pdfController = {
  poseNewPdf,
  updatePdf,
  deletePdf
}