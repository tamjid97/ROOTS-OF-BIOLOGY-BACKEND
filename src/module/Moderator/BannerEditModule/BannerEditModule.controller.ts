import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { BannerServices } from "./BannerEditModule.service";
import { sendResponse } from "../../../utils/sendRespons";



const createBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body; 
    const moderatorId = req.user?.id as string; 

    const result = await BannerServices.createBannerIntoDB(payload, moderatorId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Banner created successfully",
      data: result,
    });
  }
);




const getAllBanners = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BannerServices.getAllBannersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Banners fetched successfully",
      data: result,
    });
  }
);


const updateBanner = catchAsync(async (req: Request, res: Response) => {
const id = req.params.id as string;
  const payload = req.body;   

  const result = await BannerServices.updateBannerInDB(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Banner updated successfully",
    data: result,
  });
});


const deleteBanner = catchAsync(async (req: Request, res: Response) => {
const id = req.params.id as string;

  await BannerServices.deleteBannerFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Banner deleted successfully",
    data: null, 
  });
});



export const BannerController = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner
};