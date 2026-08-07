import express, { Application, Request, Response } from "express";
import { authRoutes } from "./module/Auth/auth.route";
import config from "./config";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRoutes } from "./module/user/user.route";
import { adminRoutes } from "./module/Admin/admin.route";
import { BatchTimeRoutes } from "./module/Moderator/BatchTimeModule/BatchTimeModule.route";
import { pdfRouter } from "./module/Moderator/pdfModuls/pdfModuls.route";
import { resultRoutes } from "./module/Moderator/ResultModule/ResultModule.route";
import { moderatorRoutes } from "./module/Moderator/StudentAppruv/moderator.routes";



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
app.use('/api/batch-times', BatchTimeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", adminRoutes);
app.use("/api/pdf" , pdfRouter);
app.use("/api/results", resultRoutes)
app.use("/api/moderator", moderatorRoutes);


export default app;