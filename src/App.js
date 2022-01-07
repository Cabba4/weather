import React, {useState} from 'react';
import './App.css';

const api = {
  key: "vRnTbCVZatMVbbxXqyp4Ij8CippRRkbw",
  base: "http://dataservice.accuweather.com/locations/v1/cities/search",
  base2: "http://dataservice.accuweather.com/forecasts/v1/daily/1day"
}

function App() {
  
  const [query,setQuery] = useState('');
  const [city,setCity] = useState({Country: {EnglishName: ''}});
  const [weather,setWeather] = useState({Headline:{Category:'' , Text: ''},DailyForecasts:[{Temperature:{Minimum:{Value:''}, Maximum:{Value:''}} }]});
  const search = evt => {
    if(evt.key === 'Enter')
    {
      fetch(`${api.base}?apikey=${api.key}&q=${query}`)
      .then(res => res.json())
      .then(result => 
        {
          setCity(result[0])
          setQuery('');
          console.log(result[0].Country.EnglishName);
          var key = result[0].Key;
          fetch(`${api.base2}/${key}?apikey=${api.key}`)
          .then(res => res.json())
          .then(result => {
            console.log(result.Headline.Category);
            console.log(result.DailyForecasts[0].Temperature.Minimum.Value);
            setWeather(result)
          })
        });
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof city!="undefined") ? ((weather.DailyForecasts[0].Temperature.Minimum.Value < 16) ? 'weather-night' : 'weather') : 'weather'}>
      <main>
        <div className="search">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter City Name"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof city != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {city.EnglishName}, {city.Country.EnglishName}
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div className="temp">
                  Min {Math.round(weather.DailyForecasts[0].Temperature.Minimum.Value)}°F
                  Max {Math.round(weather.DailyForecasts[0].Temperature.Maximum.Value)}°F
                </div>
              <div className="status">
              {weather.Headline.Category}, 
              {weather.Headline.Text}
              </div>
            </div>
          </div>
        </div>
          </div>
          ) : (
          <div>
          <div className="location-box">
            <div className="location">
              Invalid City Input :)
              <div className="date">{dateBuilder(new Date())}</div>
          </div>
        </div>
          </div>
          )}
      </main>
    </div>
  );
}

export default App;
