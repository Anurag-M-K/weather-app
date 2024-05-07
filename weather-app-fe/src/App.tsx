import React, { useState } from "react";
import { IoSunny } from "react-icons/io5";
import { fetchWeather } from "./api/weather";
import { IoIosCloudy } from "react-icons/io";
import { IoRainySharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetchWeather(city);
      if (response?.response?.status === 500) {
        toast.error("Something went wrong!");
      } else {
        setWeatherData(response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.error("Error fetching weather data:", error);
    }
  };
  
  const temperatureInFahrenheit = weatherData?.main?.temp;
  const temperatureInCelsius = ((temperatureInFahrenheit - 32) * 5) / 9;
  return (
    <div
      style={{
        backgroundImage: "url('bg-img.svg')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      className="text-[#EFAA82] flex flex-col md:flex-row gap-x-10"
    >
      <div className="bg-[#FAE2BD] mt-28 md:mt-0 w-4/5 md:w-1/3 rounded-3xl p-4">
        <h2 className="font-medium text-center mt-4">Today</h2>
        <div className="flex justify-center items-center gap-6 my-5">
          <input
            type="text"
            placeholder="Enter city name"
            className="border w-1/2 border-gray-300 rounded px-2 py-1 focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-[#EFAA82] text-white px-4 py-1 rounded"
            onClick={handleSearch}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {weatherData.base  && (
          <>
            <div className="flex justify-center items-center gap-6 my-5">
              {temperatureInCelsius?.toFixed(0) < 20 ? (
                <IoRainySharp size={50} />
              ) : temperatureInCelsius?.toFixed(0) < 30 ? (
                <IoIosCloudy size={50} />
              ) : (
                <IoSunny size={50} />
              )}

              <h1>{temperatureInCelsius?.toFixed(0)}°C</h1>
            </div>
            <h3 className="font-medium text-xl">
              {weatherData?.weather[0]?.main}
            </h3>
            <h5>
              {weatherData?.name}, {weatherData?.sys?.country}
            </h5>
            <h5>{new Date(weatherData?.dt * 1000)?.toLocaleDateString()}</h5>
            <h5 className="mb-4">
              Feels like {weatherData?.main?.feels_like} | Sunset{" "}
              {new Date(weatherData?.sys?.sunset * 1000)?.toLocaleTimeString()}
            </h5>
          </>
        )}
      </div>
      <div className=" opacity-70 flex flex-col  mx-4 md:w-1/2 p-4 ">
        <table className="table-fixed w-full rounded-3xl">
          <tbody className="bg-gray-400  rounded-xl p-5 text-white my-5">
            <tr className="my-2 ">
              <td className="mx-2">Now</td>
              <td className="mx-2">2AM</td>
              <td className="mx-2">3AM</td>
              <td className="mx-2">4AM</td>
              <td className="mx-2">5AM</td>
            </tr>
            <tr className="border-b my-2">
              <td>25°</td>
              <td>27°</td>
              <td>32°</td>
              <td>31°</td>
              <td>29°</td>
            </tr>

            <tr className="my-2">
              <td>Now</td>
              <td>2AM</td>
              <td>3AM</td>
              <td>4AM</td>
              <td>5AM</td>
            </tr>
            <tr className="my-2">
              <td>25°</td>
              <td>27°</td>
              <td>32°</td>
              <td>31°</td>
              <td>29°</td>
            </tr>
          </tbody>
        </table>

        <div className="my-4 w-4/5">
          <h2 className="text-start font-medium text-white">Random Text</h2>
          <p className="text-wrap text-white text-sm md:text-lg leading-relaxed">
            Text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting.
          </p>
        </div>
      </div>
      <Toaster position="right-bottom" />
    </div>
  );
}

export default App;
