import React, {useState} from 'react';
import Dashboard from './containers/Dashboard';
import MapComponent from './components/MapComponent';

const hecoStationLocations = [
  {
      location: {latitude: 21.407750, longitude: -157.949610}, 
      address: '98-1268 Kaahumanu St Pearl City, HI 96782'
  }, 
  {
      location: {latitude: 21.318000, longitude: -157.869290},
      address: '801 Dillingham Building Honolulu, HI 96817'
  },
  {
      location: {latitude: 21.293830, longitude: -157.710410},
      address: '515 Pepeekeo St Honolulu, HI 96825'
  },
  {
      location: {latitude: 21.436700, longitude: -157.826360},
      address: '47-388 Hui Iwa Street Kaneohe, HI 96744'
  },
  {
      location: {latitude: 21.525810, longitude: -158.037780},
      address: '64-1550 Kamehameha Hwy Wahiawa, HI 96786'
  },
  {
      location: {latitude: 21.589030, longitude: -158.103660},
      address: '66-145 Kamehameha Highway Haleiwa, HI 96712'
  }
];

const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

function App() {
  const [message, setMessage] = useState("Enter your name below:");
  const [name, setName] = useState("");

    async function onClick() {
      try {
          const response = await fetch(`${API_BASE}/hello`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({name})
          });
          const respJson = await response.json();
          setMessage(respJson.message);
      } catch (e) {
          setMessage("Sorry there was an error with your request. Please try again:")
      }
  }


  return (
      <>
      <div>
        <Dashboard />
      </div>
        <h1>{message}</h1>
        <input type={"text"} onChange={(e) => setName(e.target.value)}/>
          <button onClick={onClick}>Submit</button>
      </>

  );

}

export default App;
