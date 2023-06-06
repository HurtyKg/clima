import { Drop, MagnifyingGlass, MapPin, Wind } from "@phosphor-icons/react";
import axios from "axios";
import {  useEffect,useState } from "react";
import { WeatherData } from "../../interfaces/WeatherData";
// import { unsplashApiURL, weatherApiURL } from "../../api.ts";

type CardClimaProps = {
  setBackgroundImage: (imageUrl: string) => void;
};

interface CityData{
  lat: number;
  lon: number;
}

export function CardClima({ setBackgroundImage }: CardClimaProps)  {
 const [city, setCity] = useState('');
 const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

 const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCity(e.target.value);
}
const handleClick = () => {
  getCity();
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    getCity();
  }
};

const getCity = () => {
  axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=56e52fc674af804f94f4716fa17b2490&Lang=pt`)
    .then((response) => {
      const cityData = response.data[0];
      if (cityData) {
        getWeather(cityData);
        getBackgroundImage();
      } else {
        console.error('Nome da cidade inválido');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};


useEffect(() => {
  getCity();
}, []);


const getWeather = (cityData:CityData) => {
  const { lat, lon } = cityData;
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=56e52fc674af804f94f4716fa17b2490&lang=pt`)
    .then((response) => {
      const kelvinToCelsius = response.data.main.temp - 273.15;
      const roundedTemp = Math.round(kelvinToCelsius);
      const weatherData = {
        ...response.data,
        main: {
          ...response.data.main,
          temp: roundedTemp,
        },
      };
      setWeatherData(weatherData);
    })
    .catch((err) => console.error(err));
}

const getBackgroundImage = () => {
  axios
    .get(`https://api.unsplash.com/photos/random?query=${city}&client_id=xd7gvT_o6xDTnrwVx0FgsK409SiVlABP_3IU2RK6ucE`)
    .then((response) => {
      const image = response.data.urls.regular;
      setBackgroundImage(image);
    })
    .catch((err) => console.error(err));
};

  return (
    <div className="sub-container">
      <h1 className="titulo">Confira o clima de uma cidade</h1>
      <div className="content-input">
        <input
          type="text"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={handleCity}
          placeholder="Digite o nome da cidade"
          className="input"
        />
        <button className="button" onClick={handleClick}>
          <MagnifyingGlass size={20} color="#0a0a0a" />
        </button>
      </div>
      {weatherData && weatherData.weather && (
       <div className="content-previsão">
       <MapPin size={28} color="#D5D8DC" weight="fill" />
       <h1 className="titulo-cidade">{weatherData.name}</h1>
       <span className="graus">{weatherData.main.temp} ºC</span>
       <p className="clima">{weatherData.weather[0].description}</p>
       <div className="previsão">
         <Drop size={26} color="#f3f3f3" weight="fill" />
         <p className="barreira">{weatherData.main.humidity}%</p>
         <Wind size={28} color="#D5D8DC" />
         <p>{weatherData.wind.speed}km/h</p>
       </div>
     </div>
      )}
    </div>
  );
}


