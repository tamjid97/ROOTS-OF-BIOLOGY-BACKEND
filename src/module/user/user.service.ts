import { prisma } from "../../lib/prisma";

const getMYProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true }, 
  });
  return user;
};


const updateProfileIntoDB = async (userId: string, payload: any) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    omit: { password: true },
  });

  return updatedUser;
};



const requestModeratorIntoDB = async (userId: string) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      isApproved: 'PENDING', 
    },
  });
  return result;
};

export const userServices = {
  requestModeratorIntoDB,
  updateProfileIntoDB,
  getMYProfileFromDB

}