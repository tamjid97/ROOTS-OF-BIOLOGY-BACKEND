import express, { Application, Request, Response } from "express";
import { authRoutes } from "./module/Auth/auth.route";
import config from "./config";
import cors from "cors"
import cookieParser from "cookie-parser";


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

export default app;