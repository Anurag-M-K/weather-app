import instance from "../config/axiosInstance";

export const fetchWeather = async (city: string) => {
  try {
    const res = await instance({
      url: `http://localhost:3000/api/weather`,
      method: "POST",
      data: {city:city},
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
