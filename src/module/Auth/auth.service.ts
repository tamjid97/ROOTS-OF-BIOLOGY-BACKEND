import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { ILoginUser, RegisterUserPayload } from "./auth.interface";
import { SignOptions } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";
import { jwtUtils } from "../../utils/jwt";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { 
    name, 
    email, 
    password, 
    profilePicture, 
    phoneNumber, 
    class: studentClass, 
    institute, 
    role 
  } = payload;

  if (role === 'ADMIN') {
    throw new Error("You are not authorized to create an Admin account!");
  }

  if (phoneNumber) {
    const isUserExist = await prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (isUserExist) {
      
      throw new Error("User with this phone number already exists"); 
    }
  }

  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profilePicture,
      phoneNumber,         
      class: studentClass, 
      institute,           
      role: Role.USER
    }
  });

  return createdUser;
}


const loginUserIntoDB = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;
  
  if (!phoneNumber) {
    
    throw new Error("Phone number is required for login");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { phoneNumber }
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
}


const getMYProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true }, 
  });
  return user;
};

// UPDATE BASIC USER INFO
const updateProfileIntoDB = async (userId: string, payload: any) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    omit: { password: true },
  });

  return updatedUser;
};


export const authService = {
  registerUserIntoDB,
  loginUserIntoDB ,
  getMYProfileFromDB,
  updateProfileIntoDB
}