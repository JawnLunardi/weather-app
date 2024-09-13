import './WeatherInfoForecast.css'

function WeatherInfoForecast({weatherForecast}){
    console.log(weatherForecast)

    let dailyForecast = {}

    for(let forecast of weatherForecast.list){
        const date = new Date(forecast.dt * 1000).toLocaleDateString()
        console.log(date)
        if(!dailyForecast[date]){
            dailyForecast[date] = forecast
        }
    }

const forecastFiveDays = Object.values(dailyForecast).slice(1,6)

function convertDate(date){
    const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })
    return newDate
   
}


return (
    <div className='weather-container'>
        <h3>Próximos dias</h3>
        <div className='weather-list'>
        {forecastFiveDays.map(forecast => (
            <div key={forecast.dt} className='weather-item'>
                <p className='forecast-day'>{convertDate(forecast)}</p>
                <img 
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
        />
        <p className='forecast-description'>{forecast.weather[0].description}</p>
        <p>{Math.round(forecast.main.temp_min)}ºC Min / {Math.round(forecast.main.temp_max)}ºC Máx</p>
            </div>
        ))}
        </div>
    </div>
)

}

export default WeatherInfoForecast