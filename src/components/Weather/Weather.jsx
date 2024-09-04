import { useEffect, useState } from "react";
import './Weather.css';
import { getLocation } from "./getLocation";
import { getWeather } from "./getWeather";

export function Weather() {

	const [weather, setWeather] = useState("");
	const [location, setLocation] = useState("");
	const [temp, setTemp] = useState(0);
	const [isCelsius, setIsCelsius] = useState(true);
	const [icon, setIcon] = useState('');

	useEffect(() => {

		async function getData() {
			// Getting  location details
			const coor = await getLocation();
			console.log(coor);
			// Getting current weather details
			const data = await getWeather(coor);
			console.log(data);

			let loc = `${coor.name}, ${coor.country}`;
			setLocation(loc);
			let iconLink = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			setIcon(iconLink);
			setTemp(data.main.temp.toFixed(0));
			setWeather(data.weather[0].description.toUpperCase());
		}

		getData();
		const interval = setInterval(() => {
			getData();
		}, 300000);

		return () => clearInterval(interval);
	}, []);

	function handleUnitChange() {
		let newTemp = temp;
		if (isCelsius == true) {
			newTemp = (newTemp * 9/5) + 32;
			newTemp = newTemp.toFixed(0);
		} else {
			newTemp = (newTemp - 32) * 5/9;
			newTemp = newTemp.toFixed(0);
		}
		setTemp(newTemp);
		setIsCelsius(!isCelsius);
	}

	return (
		<div className="currentWeather">
			<img className="weatherIcon" src={icon}></img>
			<p className="weather">{weather}</p>
			<p className="location">{location.toUpperCase()}</p>
			<p className="temp">{temp}° {isCelsius ? "C" : "F" }</p>
			{/* <button className="unit" onClick={handleUnitChange}>Change unit</button> */}
		</div>
	)
}