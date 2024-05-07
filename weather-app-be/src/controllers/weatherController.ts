import axios from 'axios';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Weather from '../models/weatherSchema';

export const fetchCurrentWeather = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { city } = req.body;
      const apiKey = '0babedd30d7437f5108fdf54ad68949e';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

      const response = await axios.get(apiUrl);
      const weatherData = response.data;

    //   saving to database
      const newWeather = new Weather(weatherData);
      await newWeather.save();
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);
