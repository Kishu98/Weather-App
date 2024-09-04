export async function getWeather(coor){
    const API_KEY = import.meta.env.VITE_API_KEY;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coor.lat}&lon=${coor.lon}&units=metric&appid=${API_KEY}`)

    if(res.ok) {
        let data = await res.json();
        return data;
    } else {
        alert("Error: " + res.status);
    }
}