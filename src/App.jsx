import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherInfoForecast from './components/WeatherInfoForecast/WeatherInfoForecast'

function App() {
  const [weather, setWeather] = useState()
  const [weatherForecast, setWeatherForecast] = useState()

  const inputRef = useRef()

  async function citySearch(){
    const cityName = inputRef.current.value
    const apiKey = "cebcd482eda57fa9a6714c1c2ba91885"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br` 
    
    const apiInfo = await axios.get(url)
    const apiInfoForecast = await axios.get(urlForecast)    

    setWeatherForecast(apiInfoForecast.data)
    setWeather(apiInfo.data)
  }

  return (
    <>
      <div className='container'>
        <h1>Previsão do tempo</h1>
        <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
        <button onClick={citySearch}>Procurar</button>

        {weather && <WeatherInfo weather={weather}/>}
        {weatherForecast && <WeatherInfoForecast weatherForecast={weatherForecast}/>}
      </div>
      <div className='contato'>
        <a href="https://www.linkedin.com/in/jv-lunardi/" className='link-contato' target='_blank' >João Vitor Lunardi</a>
      </div>
    </>
  )
}

export default App
