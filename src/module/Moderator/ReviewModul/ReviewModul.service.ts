import { prisma } from "../../../lib/prisma";


const approveReviewIntoDB = async (id: string) => {

  const isReviewExist = await prisma.review.findUnique({
    where: { id },
  });

  if (!isReviewExist) {
    throw new Error("Review not found!");
  }


  if (isReviewExist.isApproved === "APPROVED") { 
    throw new Error("Review is already approved!");
  }


  const result = await prisma.review.update({
    where: { id },
    data: {
      isApproved: "APPROVED",  
    },
  });

  return result;
};

export const reviewService = {
  approveReviewIntoDB,
};