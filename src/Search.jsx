import {useState} from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Search.css"
export default function Search({updateWeather}){
    const [city,setcity] = useState("");
    const [error,seterror] = useState(false);
    let inputChange = (event)=>{
        setcity(event.target.value);
    }
    let handleSubmit =
        async (event)=>{
            try{
        event.preventDefault(); 
        setcity("");
        let detail = await getDetails();
        await updateWeather(detail);
        }catch(err){
            seterror(true);
        }
    }
    let getDetails = async ()=>{
        try{let location = await getLocation();
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=b60bf9061e1d9b37c212a09026f25c79&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            city : city,
            temp : jsonResponse.main.temp,
            tempMin : jsonResponse.main.temp_min,
            tempMax : jsonResponse.main.temp_max,
            humidity : jsonResponse.main.humidity,
            feelsLike : jsonResponse.main.feels_like,
            weather : jsonResponse.weather[0].description,
        }
        return result;
    }catch(err){
        throw err;
    }
    }
    let getLocation = async()=>{
        let response = await fetch(URL2);
        let jsonResponse = await response.json();
        return {lat : jsonResponse[0].lat,lon : jsonResponse[0].lon};
    }
    let URL2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=b60bf9061e1d9b37c212a09026f25c79`;
    return (
        <div className="search">
            <h3>Search for Weather</h3>
            <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={inputChange} required/>
            <br/><br/>
            <Button variant="contained" type="submit">Search</Button>
            </form>
            {error && <p style={{color:"red"}}>No such place exist</p>}
        </div>
    );
}