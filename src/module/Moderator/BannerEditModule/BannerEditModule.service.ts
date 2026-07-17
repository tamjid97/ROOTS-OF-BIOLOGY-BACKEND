import { prisma } from "../../../lib/prisma";
import { IBanner, IUpdated } from "./BannerEditModuleInterface";

const createBannerIntoDB = async (payload: IBanner, moderatorId: string) => {
  const result = await prisma.banner.create({
    data: {
      title: payload.title,
      description: payload.description,
      picture: payload.picture,
      userId: moderatorId,   
      UserId: moderatorId,   
    },
  });
  
  return result;
};


const getAllBannersFromDB = async () => {
  const result = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc", 
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};


const updateBannerInDB = async (id: string, payload: IUpdated) => {
  const result = await prisma.banner.update({
    where: {
      id, 
    },
    data: payload, 
  });

  return result;
};


const deleteBannerFromDB = async (id: string) => {
  const result = await prisma.banner.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BannerServices = {
  createBannerIntoDB,
  getAllBannersFromDB,
  updateBannerInDB,
  deleteBannerFromDB
};