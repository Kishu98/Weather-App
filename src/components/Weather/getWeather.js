export async function getWeather(coor){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coor.lat}&lon=${coor.lon}&units=metric&appid=802270570b5c4938a3e9a207db79825f`)

    if(res.ok) {
        let data = await res.json();
        return data;
    } else {
        alert("Error: " + res.status);
    }
}