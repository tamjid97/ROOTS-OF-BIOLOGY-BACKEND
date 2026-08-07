import { prisma } from "../../lib/prisma";

const getMYProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true }, 
  });
  return user;
};

const updateProfileIntoDB = async (userId: string, payload: any) => {
  // ব্যবহারকারী কেবল এই ফিল্ডগুলোই পরিবর্তন করতে পারবে
  const allowedData = {
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    class: payload.class,
    institute: payload.institute,
    profilePicture: payload.profilePicture,
  };

  // যে ফিল্ডগুলো পাঠানো হয়নি সেগুলো বাদ দেওয়া হলো
  Object.keys(allowedData).forEach(
    (key) => (allowedData as any)[key] === undefined && delete (allowedData as any)[key]
  );

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: allowedData,
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

const requestStudentIntoDB = async (userId: string) => {
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
  requestStudentIntoDB,
  updateProfileIntoDB,
  getMYProfileFromDB
}