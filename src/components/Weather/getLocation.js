export async function getLocation() {
   
    const res = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=bangalore&limit=3&appid=802270570b5c4938a3e9a207db79825f");

    if(res.ok) {
        let data = await res.json();
        return data[0];
    } else {
        alert("Error" + res.status);
    }
}