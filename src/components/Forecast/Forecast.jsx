import { useEffect, useState } from "react";
import { getLocation } from "../Weather/getLocation";
import "./Forecast.css";

export function Forecast() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [forecast, setForecast] = useState([]);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    async function getForecast() {
      const coor = await getLocation();
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coor.lat}&lon=${coor.lon}&units=metric&appid=${API_KEY}`
      );
      if (res.ok) {
        let forecast = await res.json();
        // console.log(forecast);
        let list = forecast.list;
        // getting next 5 days in list
        list = list.filter((listItem) => listItem.dt_txt.includes("15:00:00"));
        console.log(list);
        setForecast(list);
      } else {
        alert("Error: " + res.status);
      }
    }
    getForecast();
  }, []);

  return (
    <div className='container'>
      <ul className='forecast-list'>
        {forecast.map((forecast) => (
          <li>
            <div className='dayForecast'>
              <p className='day'>{daysOfWeek[new Date(forecast.dt * 1000).getDay()]}</p>
              <img
                className='icon'
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              ></img>
              <p className='temperature'>{forecast.main.temp.toFixed(0)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
