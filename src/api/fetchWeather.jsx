import React from "react";
import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d4c514036f1b216268f5adbc02529f1a";

const fetchWeather = async (query) => {
  const { data } = await axios.get(
    URL,
    {
      params: {
        q: query,
        units: "metric",
        APPID: API_KEY,
      },
    })
    .catch (error => {
      return {data: error.response.data ? error.response.data : 'No data'}
      }
    )
    console.log(data);
    return data;
    };




export default fetchWeather;
