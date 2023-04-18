import express from "express";
import morgan from "morgan";
import cors from "cors"
import cacheInit from "./routers/cache.js";
import responseTime from "response-time";
import cookieParser from "cookie-parser";

//Routes
import languageRoutes from "./routers/languaje.routes.js";

const app = express();

//Settings
app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(cacheInit);
app.use(responseTime());
app.use(cookieParser());

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use(languageRoutes);

export default app;