import express, { Application, Request, Response } from "express";
import { authRoutes } from "./module/Auth/auth.route";
import config from "./config";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRoutes } from "./module/user/user.route";
import { adminRoutes } from "./module/Admin/admin.route";
import { BannerRoutes } from "./module/Moderator/BannerEditModule/BannerEditModule.route";
import { PictureRoutes } from "./module/Moderator/PictureEditsModule/PictureEditsModule.route";
import { BatchTimeRoutes } from "./module/Moderator/BatchTimeModule/BatchTimeModule.route";


const app : Application = express();

app.use(cors({
  origin: config.app_url,
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req : Request , res : Response)=>{
res.send("Hello world")
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/users", adminRoutes)
app.use('/api/banners',BannerRoutes);
app.use('/api/pictures',PictureRoutes)
app.use('/api/batch-times', BatchTimeRoutes);
export default app;