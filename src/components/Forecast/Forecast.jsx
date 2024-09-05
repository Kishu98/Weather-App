import { useEffect, useState } from "react";
import { getLocation } from "../Weather/getLocation";

export function Forecast() {
	const API_KEY = import.meta.env.VITE_API_KEY;

	const [iconLinks, setIconLinks] = useState([]);
	let icons = [];

	useEffect(() => {
		async function getForecast() {
			const coor = await getLocation();
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${coor.lat}&lon=${coor.lon}&units=metric&appid=${API_KEY}`
			);
			if (res.ok) {
				let forecast = await res.json();
				let list = forecast.list;
				// getting next 5 days in list
				let newList = list.filter((listItem) =>
					listItem.dt_txt.includes("15:00:00")
				);
				// console.log(newList);

				// Getting the icons
				icons = newList.map((icon) => icon.weather[0]);
				// console.log(icons);
				icons = icons.map(
					(icon) =>
						`https://openweathermap.org/img/wn/${icon.icon}@2x.png`
				);
				setIconLinks(icons);
			} else {
				alert("Error: " + res.status);
			}
		}
		getForecast();
	}, []);

	return (
		<>
			<ul>
				{iconLinks.map((link) => (
					<li>
						<p></p>
						<img src={link}></img>
					</li>
				))}
			</ul>
		</>
	);
}
