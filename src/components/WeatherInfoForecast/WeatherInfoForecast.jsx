import './WeatherInfoForecast.css'

function WeatherInfoForecast({weatherForecast}) {
    console.log(weatherForecast);

    let dailyForecast = {};


    for (let forecast of weatherForecast.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();


        if (!dailyForecast[date]) {
            dailyForecast[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                weather: forecast.weather[0], 
                dt: forecast.dt
            };
        } else {

            dailyForecast[date].temp_min = Math.min(dailyForecast[date].temp_min, forecast.main.temp_min);
            dailyForecast[date].temp_max = Math.max(dailyForecast[date].temp_max, forecast.main.temp_max);
        }
    }


    const forecastFiveDays = Object.values(dailyForecast).slice(1, 6);


    function convertDate(forecast) {
        const newDate = new Date(forecast.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' });
        return newDate;
    }

    return (
        <div className='weather-container'>
            <h3>Próximos dias</h3>
            <div className='weather-list'>
                {forecastFiveDays.map(forecast => (
                    <div key={forecast.dt} className='weather-item'>
                        <p className='forecast-day'>{convertDate(forecast)}</p>
                        <img 
                            src={`http://openweathermap.org/img/wn/${forecast.weather.icon}.png`} 
                            alt="Ícone de clima"
                        />
                        <p className='forecast-description'>{forecast.weather.description}</p>
                        <p>{Math.round(forecast.temp_min)}ºC Min / {Math.round(forecast.temp_max)}ºC Máx</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInfoForecast