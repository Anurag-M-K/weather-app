import mongoose, { Schema, Document } from 'mongoose';

interface IWeatherData extends Document {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const weatherSchema = new Schema<IWeatherData>({
  coord: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  weather: [
    {
      id: { type: Number, required: true },
      main: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true },
    },
  ],
  base: { type: String, required: true },
  main: {
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    temp_min: { type: Number, required: true },
    temp_max: { type: Number, required: true },
    pressure: { type: Number, required: true },
    humidity: { type: Number, required: true },
    sea_level: { type: Number, required: true },
    grnd_level: { type: Number, required: true },
  },
  visibility: { type: Number, required: true },
  wind: {
    speed: { type: Number, required: true },
    deg: { type: Number, required: true },
    gust: { type: Number, required: true },
  },
  clouds: {
    all: { type: Number, required: true },
  },
  dt: { type: Number, required: true },
  sys: {
    type: { type: Number, required: true },
    id: { type: Number, required: true },
    country: { type: String, required: true },
    sunrise: { type: Number, required: true },
    sunset: { type: Number, required: true },
  },
  timezone: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cod: { type: Number, required: true },
});

const Weather = mongoose.model<IWeatherData>('Weather', weatherSchema);

export default Weather;
