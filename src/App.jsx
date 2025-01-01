import InfoBox from "./InfoBox"
import Search from "./Search"
import { useState } from "react";
function App() {
  const [weatherInfo,setweatherInfo] = useState({
    city : "Delhi",
    temp : 28.5,
    tempMin : 21.1,
    tempMax : 32.4,
    humidity : 47,
    feelsLike : 30,
    weather : "haze",
});
let updateWeather = (result)=>{
    setweatherInfo(result);
}
  return (
    <>
      <Search updateWeather={updateWeather}/>
      <InfoBox weatherInfo = {weatherInfo}/>
    </>
  )
}
export default App
