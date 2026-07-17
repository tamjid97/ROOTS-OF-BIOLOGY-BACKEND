import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { BatchTimeServices } from "./BatchTimeModule.service";
import { sendResponse } from "../../../utils/sendRespons";

// ১. নতুন ব্যাচ টাইম তৈরি করার কন্ট্রোলার
const createBatchTime = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const moderatorId = req.user?.id as string; // মিডলওয়্যার থেকে পাওয়া মডারেটর আইডি

  const result = await BatchTimeServices.createBatchTimeIntoDB(payload, moderatorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Batch time posted successfully",
    data: result,
  });
});

// ২. সব ব্যাচ টাইম তুলে আনার কন্ট্রোলার
const getAllBatchTimes = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchTimeServices.getAllBatchTimesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Batch times fetched successfully",
    data: result,
  });
});

// ৩. ব্যাচ টাইম আপডেট করার কন্ট্রোলার
const updateBatchTime = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string; // টাইপ সেফটি নিশ্চিত করা হলো
  const payload = req.body;

  const result = await BatchTimeServices.updateBatchTimeInDB(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Batch time updated successfully",
    data: result,
  });
});

// ৪. ব্যাচ টাইম ডিলিট করার কন্ট্রোলার
const deleteBatchTime = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await BatchTimeServices.deleteBatchTimeFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Batch time deleted successfully",
    data: null,
  });
});

export const BatchTimeController = {
  createBatchTime,
  getAllBatchTimes,
  updateBatchTime,
  deleteBatchTime,
};