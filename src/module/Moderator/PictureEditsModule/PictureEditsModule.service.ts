
import { prisma } from "../../../lib/prisma";
import { IPicture } from "./picture.interface";

const createPictureIntoDB = async (payload: IPicture, moderatorId: string) => {
  const result = await prisma.picture.create({
    data: {
      title: payload.title,
      description: payload.description,
      pictureUrl: payload.pictureUrl, 
      userID: moderatorId,            
    },
  });
  return result;
};


const getAllPicturesFromDB = async () => {
  const result = await prisma.picture.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};


const updatePictureInDB = async (id: string, payload: Partial<IPicture>) => {
  const result = await prisma.picture.update({
    where: {
      id,
    },
    data: payload, 
  });
  return result;
};

const deletePictureFromDB = async (id: string) => {
  const result = await prisma.picture.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PictureServices = {
  createPictureIntoDB,
  getAllPicturesFromDB,
  updatePictureInDB,
  deletePictureFromDB,
};