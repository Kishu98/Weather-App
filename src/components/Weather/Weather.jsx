import { useEffect, useState } from "react";
import './Weather.css';
import { getLocation } from "./getLocation";
import { getWeather } from "./getWeather";
import { Forecast } from "../Forecast/Forecast";

export function Weather() {

	const [weather, setWeather] = useState("");
	const [location, setLocation] = useState("");
	const [temp, setTemp] = useState(0);
	const [isCelsius, setIsCelsius] = useState(true);
	const [icon, setIcon] = useState('');

	useEffect(() => {

		const coor = {
			"name": "Bengaluru",
			"local_names": {
			  "or": "ବେଙ୍ଗାଳୁରୁ",
			  "cs": "Bengalúru",
			  "fr": "Bangalore",
			  "ur": "بنگلور",
			  "el": "Μπανγκαλόρ",
			  "as": "বাংগালোৰ",
			  "hi": "बेंगलुरु",
			  "ru": "Бангалор",
			  "zh": "班加罗尔",
			  "te": "బెంగళూరు",
			  "my": "ဘန်ဂလိုမြို့",
			  "ml": "ബെംഗളൂരു",
			  "mr": "बंगळूर",
			  "ms": "Bangalore",
			  "it": "Bangalore",
			  "ko": "벵갈루루",
			  "ar": "بنغالور",
			  "kn": "ಬೆಂಗಳೂರು",
			  "oc": "Bengaluri",
			  "ja": "バンガロール",
			  "th": "บังคาลอร์",
			  "be": "বেঙ্গালূরু",
			  "de": "Bangalore",
			  "bn": "বেঙ্গালুরু",
			  "he": "בנגלור",
			  "ta": "பெங்களூரு",
			  "en": "Bengaluru",
			  "uk": "Бенгалуру",
			  "gu": "બેંગલોર",
			  "pa": "ਬੈਂਗਲੁਰੂ"
			},
			"lat": 12.9767936,
			"lon": 77.590082,
			"country": "IN",
			"state": "Karnataka"
		  }
		
		const data = {
			"coord": {
			  "lon": 77.5901,
			  "lat": 12.9768
			},
			"weather": [
			  {
				"id": 802,
				"main": "Clouds",
				"description": "scattered clouds",
				"icon": "03n"
			  }
			],
			"base": "stations",
			"main": {
			  "temp": 23.95,
			  "feels_like": 24.46,
			  "temp_min": 23.51,
			  "temp_max": 24.72,
			  "pressure": 1011,
			  "humidity": 79,
			  "sea_level": 1011,
			  "grnd_level": 910
			},
			"visibility": 6000,
			"wind": {
			  "speed": 3.09,
			  "deg": 240
			},
			"clouds": {
			  "all": 40
			},
			"dt": 1725465334,
			"sys": {
			  "type": 1,
			  "id": 9205,
			  "country": "IN",
			  "sunrise": 1725410330,
			  "sunset": 1725454733
			},
			"timezone": 19800,
			"id": 6695236,
			"name": "Kanija Bhavan",
			"cod": 200
		  }

		// async function getData() {
		// 	// Getting  location details
		// 	const coor = await getLocation(); 
		// 	console.log(coor);
		// 	// Getting current weather details
		// 	const data = await getWeather(coor);
		// 	console.log(data);

			let loc = `${coor.name}, ${coor.country}`;
			setLocation(loc);
			let iconLink = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			setIcon(iconLink);
			setTemp(data.main.temp.toFixed(0));
			setWeather(data.weather[0].description.toUpperCase());
		// }

		// getData();
		// const interval = setInterval(() => {
		// 	getData();
		// }, 300000);

		// return () => clearInterval(interval);
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
			<Forecast />
		</div>
	)
}