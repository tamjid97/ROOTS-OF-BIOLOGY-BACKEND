import { prisma } from "../../../lib/prisma";

const postNewPdfIntoDB = async (
  userID: string, 
  pdfUrl: string, 
  title?: string, 
  subject?: string, 
  className?: string, 
  image?: string
) => {
  if (!pdfUrl) {
    throw new Error("PDF URL is required!");
  }

  const result = await prisma.pdfTable.create({
    data: {
      userID,
      pdfUrl,
      title,
      subject,
      className,
      image,
    },
  });
  return result;
};

// সবগুলো PDF পাওয়ার জন্য
const getAllPdfFromDB = async () => {
  const result = await prisma.pdfTable.findMany({
    include: {
      user: {
        select: {
          name: true,
          studentId: true,
          profilePicture: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updatePdfIntoDB = async (
  id: string, 
  userID: string, 
  payload: { pdfUrl?: string; title?: string; subject?: string; className?: string; image?: string }
) => {
  const isPdfExist = await prisma.pdfTable.findUnique({
    where: { id },
  });

  if (!isPdfExist) {
    throw new Error("PDF not found!");
  }

  // মডারেটর বা অ্যাডমিন যেকোনো পিডিএফ আপডেট করতে পারার জন্য ইউজার আইডি চেক বাইপাস করা হলো
  const result = await prisma.pdfTable.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deletePdfIntoDB = async (id: string, userID: string) => {
  const isPdfExist = await prisma.pdfTable.findUnique({
    where: { id },
  });

  if (!isPdfExist) {
    throw new Error("PDF not found!");
  }

  const result = await prisma.pdfTable.delete({
    where: { id },
  });
  return result;
};

export const prfService = {
  postNewPdfIntoDB,
  getAllPdfFromDB,
  updatePdfIntoDB,
  deletePdfIntoDB
};