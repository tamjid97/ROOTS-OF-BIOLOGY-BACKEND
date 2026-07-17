import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendRespons";
import httpStatus  from "http-status";
import { prfService } from "./pdfModuls.service";



const postNewPdf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const user = (req as any).user; 
  const { pdfUrl, title } = req.body;

  const result = await prfService.postNewPdfIntoDB(user.id, pdfUrl, title);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED, 
    message: "PDF uploaded successfully",
    data: result,
  });
});


const updatePdf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; 
  const user = (req as any).user; 
  const { pdfUrl, title } = req.body;

  const result = await prfService.updatePdfIntoDB(id as string, user.id, { pdfUrl, title });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "PDF updated successfully",
    data: result,
  });
});


const deletePdf = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; 
  const user = (req as any).user; 

  const result = await prfService.deletePdfIntoDB(id as string, user.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "PDF deleted successfully",
    data: result,
  });
});


export const pdfController = {
  postNewPdf,
  updatePdf,
  deletePdf
}