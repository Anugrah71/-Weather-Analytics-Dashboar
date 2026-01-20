import api from "../api/axios";

export const getCurrentWeather = async (city) => {
  const res = await api.get('/api/weather/current', {
    params: { city } 
  });
  return res.data; 
};

export const getForecast = async (city, days = 7) => {
  const res = await api.get('/api/weather/forecast', {
    params: { city, days }
  });
  return res.data;
};

export const getHistory = async (city, date) => {
  const res = await api.get('/api/weather/history', {
    params: { city, date }
  });
  return res.data;
};

export const searchCities = async (citySearch) => {
  const res = await api.get('/api/weather/search', {
    params: { city: citySearch }
  });
  return res.data;
};