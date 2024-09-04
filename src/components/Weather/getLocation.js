export async function getLocation() {

    const API_KEY = import.meta.env.VITE_API_KEY;
   
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=bangalore&limit=3&appid=${API_KEY}`);

    if(res.ok) {
        let data = await res.json();
        return data[0];
    } else {
        alert("Error" + res.status);
    }
}