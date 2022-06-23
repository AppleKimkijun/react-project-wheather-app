import { useEffect, useInsertionEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

//1.앱이 실행 되자마자 현재위치 기반의 날씨가 보인다.
//2.날씨 정보에는 도시, 섭씨, 화씨 날씨 상태정보
//3.5개의 버튼이 있다 (현재위치 4개의 도시위치)
//4.도시 버튼을 클릭 할때 마다 날씨정보
//5.현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6.데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading,setLoading] = useState(false)
  const cities = ["seoul", "daegu", "daejeon", "busan", "incheon"];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log("현재위치",lat,lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5c0e2e702906e62f71f3c60d050a4b6a&units=metric`;
    setLoading(true)
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false)
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5c0e2e702906e62f71f3c60d050a4b6a&units=metric`;
    setLoading(true)
    let response = await fetch(url);
    let data = await response.json();
    // console.log("Data",data)
    setWeather(data);
    setLoading(false)
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <div>
      {loading?
      <div className="container"><ClipLoader class color="#f88c6b" loading={loading}size={150} /></div> :
      <div className="container">
        <WeatherBox weather={weather}></WeatherBox>
        <WeatherButton cities={cities} setCity={setCity} handleCityChange={handleCityChange}></WeatherButton>
      </div>
      }
      
    </div>
  );
}

export default App;
