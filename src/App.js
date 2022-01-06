import React, {userState} from 'react';
import './App.css';

const api = {
  key: "H1lfELGGDnw6Ic3VygOva2QVV5ThsAPU",
  base: "http://dataservice.accuweather.com/locations/v1/cities/search"
}

function App() {
  
  return (
    <div className="weather">
      <main>
        <div className="search">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter City Name"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
