import cors from "cors"; // Import cors
import express, { Express } from "express";
import {
  sequelizeConnection as sequelize,
} from "./db/database";
import { createDatabase } from "./db/dbCreate";
import { errorHandler } from "./middlewares/errorHandler";
import smsRoutes from "./routers/sms.router";

const app: Express = express();

const startServer = async () => {
  await createDatabase(); // Create the database if it doesn't exist
  await sequelize.sync()
};

startServer();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));

app.use("/api/sms", smsRoutes);
app.use(errorHandler);

export default app;
