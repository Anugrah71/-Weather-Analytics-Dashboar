import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentWeather,
  getForecast,
  searchCities,
  getHistory,
} from "../../api/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const data = await getCurrentWeather(city);
    return data;
  }
);
export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => {
    const data = await getForecast(city);
    return data;
  }
);
export const fetchWeatherHistory = createAsyncThunk(
  "weather/fetchWeatherHistory",
  async (city) => {
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    const results = await Promise.all(
      dates.map(async (formatted) => {
        try {
          const data = await getHistory(city, formatted);
          const forecastDay = data?.forecast?.forecastday?.[0];
          if (forecastDay?.day) {
            return {
              date: formatted,
              max: forecastDay.day.maxtemp_c,
              min: forecastDay.day.mintemp_c,
            };
          }
        } catch (err) {
          console.error(`Failed to fetch history for ${formatted}:`, err);
        }
        return null;
      })
    );

    const validDays = results.filter(Boolean).reverse();
    return { city, history: validDays };
  }
);

export const fetchSearchResults = createAsyncThunk(
  "weather/fetchSearchResults",
  async (citySearch) => {
    const res = await searchCities(citySearch);
    return res;
  }
);
