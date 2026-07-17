import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { PictureServices } from "./PictureEditsModule.service";
import { sendResponse } from "../../../utils/sendRespons";


const createPicture = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const moderatorId = req.user?.id as string; 

  const result = await PictureServices.createPictureIntoDB(payload, moderatorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Picture posted successfully",
    data: result,
  });
});


const getAllPictures = catchAsync(async (req: Request, res: Response) => {
  const result = await PictureServices.getAllPicturesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pictures fetched successfully",
    data: result,
  });
});


const updatePicture = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string; 
  const payload = req.body;

  const result = await PictureServices.updatePictureInDB(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Picture updated successfully",
    data: result,
  });
});


const deletePicture = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await PictureServices.deletePictureFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Picture deleted successfully",
    data: null,
  });
});

export const PictureController = {
  createPicture,
  getAllPictures,
  updatePicture,
  deletePicture,
};