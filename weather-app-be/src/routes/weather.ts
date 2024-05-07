import express from "express";
import { fetchCurrentWeather } from "../controllers/weatherController";
const router = express.Router();

router.route('/weather').post(fetchCurrentWeather)

export default router;
