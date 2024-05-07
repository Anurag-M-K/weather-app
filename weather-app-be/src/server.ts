import express from "express";

import cors from "cors";
import connectDb from "./config/db";
import weatherRoutes from './routes/weather'
const app = express();
const port = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());
connectDb();


app.use('/api',weatherRoutes)
app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
