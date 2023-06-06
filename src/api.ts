import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const unsplashApiKey = process.env.REACT_APP_UNSPLASH_API_KEY;

export const weatherApiURL  = `http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=${apiKey}&Lang=pt`;
export const unsplashApiURL = `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`









// interface CityData{
//   lat: number;
//   lon: number;
// }

// (cityData:CityData)

// .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=56e52fc674af804f94f4716fa17b2490&Lang=pt`)
// .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=56e52fc674af804f94f4716fa17b2490&lang=pt`)
// .get(`https://api.unsplash.com/photos/random?query=${city}&client_id=xd7gvT_o6xDTnrwVx0FgsK409SiVlABP_3IU2RK6ucE`)