
import { prisma } from "../../../lib/prisma";
import { IBatch } from "./batch.interface";


const createBatchTimeIntoDB = async (payload: IBatch, moderatorId: string) => {
  const result = await prisma.batch.create({
    data: {
      batchName: payload.batchName,
      date: payload.date,
      classTime: payload.classTime,
      userId: moderatorId, 
    },
  });
  return result;
};


const getAllBatchTimesFromDB = async () => {
  const result = await prisma.batch.findMany({
    orderBy: {
      createdAt: "desc", 
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};


const updateBatchTimeInDB = async (id: string, payload: Partial<IBatch>) => {
  const result = await prisma.batch.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};


const deleteBatchTimeFromDB = async (id: string) => {
  const result = await prisma.batch.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BatchTimeServices = {
  createBatchTimeIntoDB,
  getAllBatchTimesFromDB,
  updateBatchTimeInDB,
  deleteBatchTimeFromDB,
};