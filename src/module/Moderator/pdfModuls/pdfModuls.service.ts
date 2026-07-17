import { prisma } from "../../../lib/prisma";




const postNewPdfIntoDB = async (userID: string, pdfUrl: string, title?: string) => {
  if (!pdfUrl) {
    throw new Error("PDF URL is required!");
  }

  const result = await prisma.pdfTable.create({
    data: {
      userID,
      pdfUrl,
      title,
    },
  });
  return result;
};


const updatePdfIntoDB = async (id: string, userID: string, payload: { pdfUrl?: string; title?: string }) => {

  const isPdfExist = await prisma.pdfTable.findUnique({
    where: { id },
  });

  if (!isPdfExist) {
    throw new Error("PDF not found!");
  }


  if (isPdfExist.userID !== userID) {
    throw new Error("You are not authorized to update this PDF!");
  }


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

  if (isPdfExist.userID !== userID) {
    throw new Error("You are not authorized to delete this PDF!");
  }


  const result = await prisma.pdfTable.delete({
    where: { id },
  });
  return result;
};

export const prfService = {
  postNewPdfIntoDB,
  updatePdfIntoDB,
  deletePdfIntoDB
}