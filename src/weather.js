import React, { useEffect, useRef, useState } from 'react'
import './weather.css'

const Weather = () => {

    const [weather, setWeather] = useState(null);
    const cityInput = useRef(null);

    async function fetchWeather(city) {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=be165ff4ecee5ed8894cc8aa13e66836`;
        const result = await fetch(api);
        const weatherData = await result.json();
        setWeather(weatherData.main);
    }
    useEffect(() => {
        fetchWeather();
    }, []);

    const handleSearch = () => {
        const city = cityInput.current.value;
        if (city) {
            fetchWeather(city);
        }
    }
    return (
        <>
            <div className='weatherData'>
                <div className='searchBox'>
                    <input type='text' ref={cityInput} placeholder='Enter City'></input>
                    <button onClick={() => { handleSearch() }}>See Weather</button>
                </div>
                {weather &&
                    <div className='Results'>
                        <div className='temp'>
                            <h1>{weather.temp}</h1>
                            <h4>Celsius</h4>
                        </div>
                        <div className='other'>
                            <p>Min Temp <br />{weather.temp_min}</p>
                            <p>Max Temp <br />{weather.temp_max}</p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Weather
