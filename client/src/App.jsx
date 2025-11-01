import './App.css'
import "./index.css";
import { useState, useEffect } from "react";
import { getCurrentWeather } from "./api/weather";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrentWeather("London")
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      {data ? (
        <div>
          <h2 className="text-xl">{data.location.name}</h2>
          <p>Temperature: {data.current.temp_c}°C</p>
          <p>Condition: {data.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

