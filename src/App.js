import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import { ClipLoader } from "react-spinners";
import { Container } from "react-bootstrap";

// 1. 앱이 실행되자마자 현재위치기반 날씨정보가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태
// 3. 5개의 버튼이 있다.(현재위치, 나머지는 다른 도시)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 보인다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨정보가 나온다.
// 6. 데이터를 들고오는 동안 로딩스피너가 돈다.

// API : https://openweathermap.org/api
// Demo : https://bitna-weather.netlify.app/

// https://www.w3schools.com/html/html5_geolocation.asp
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://hackmd.io/@oW_dDxdsRoSpl0M64Tfg2g/HkMdpT84c
// https://github.com/legobitna/weather-app-function

const cities = ["paris", "new york", "tokyo", "seoul"];
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {

  const [weather, setWether] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // let latitude = position.coords.latitude;
      // let longitude = position.coords.longitude;
      const { latitude, longitude } = position.coords;
      // console.log("현재 위치 : ", lat, lon);
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      // console.log("data : ", data);
      setWether(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      // console.log("data : ", data);
      setWether(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <Container className="vh-100">
      {loading ? (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="main-container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
        </div>
      ) : (
        apiError
      )}
    </Container>
  );
}

export default App;
