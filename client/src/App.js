import React, {useState} from 'react';
import Dashboard from './containers/Dashboard';


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
        {/*
        <h1>{message}</h1>
        <input type={"text"} onChange={(e) => setName(e.target.value)}/>
          <button onClick={onClick}>Submit</button>
        */}

      </>

  );

}

export default App;
