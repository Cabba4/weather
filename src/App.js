import React, {useState} from 'react';
import './App.css';

const api = {
  key: "H1lfELGGDnw6Ic3VygOva2QVV5ThsAPU",
  base: "http://dataservice.accuweather.com/locations/v1/cities/search",
  base2: "http://dataservice.accuweather.com/forecasts/v1/daily/1day"
}

function App() {
  
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt => {
    if(evt.key == 'Enter')
    {
      fetch(`${api.base}?apikey=${api.key}&q=${query}`)
      .then(res => res.json())
      .then(result => 
        {
          setWeather(result[0].Key)
          setQuery('');
          console.log(result[0].Key);
          var key = result[0].Key;
          fetch(`${api.base2}/${key}?apikey=${api.key}`)
          .then(res => res.json())
          .then(result => {
            console.log(result)
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
    <div className="weather">
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
        <div>
          <div className="location-box">
            <div className="location">
              New York City, US
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div className="temp">
                  15*C
                </div>
                <div className="status">Sunny</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
