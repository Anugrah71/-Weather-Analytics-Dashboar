import {
  X,
  ArrowLeft,
  Sunrise,
  Sunset,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import { getTemperatureTrends } from "../utils/WeatherFormate";

const convertTemp = (temp, unit) =>
  unit === "fahrenheit" ? (temp * 9) / 5 + 32 : temp;

const DetailedView = ({ city, onClose, forecastdays, current }) => {
  const { unit } = useSelector((state) => state.weather);

  const icon = current?.condition?.icon;
  const condition = current?.condition?.text;

  if (!forecastdays?.forecastday || !current) {
    console.log("Missing forecast or current data for:", city);
    return <div className="p-6 text-center text-gray-600">Loading data...</div>;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl max-w-6xl w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-6">
            <ArrowLeft
              size={24}
              className="mr-4 cursor-pointer"
              onClick={onClose}
            />
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
          </div>
          Current Weather
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={icon} alt={condition} className="w-12 h-12" />
                <div className="ml-6">
                  <div className="text-6xl font-bold text-gray-800">
                    {convertTemp(current.temp_c, unit).toFixed(1)}°
                    {unit === "celsius" ? "C" : "F"}
                  </div>
                  <div className="text-xl text-gray-600">
                    {current.condition.text}
                  </div>
                  <div className="text-gray-500">
                    Feels like {convertTemp(current.feelslike_c, unit)}°
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Sunrise className="mx-auto mb-2 text-orange-500" />
                  <div className="text-sm text-gray-600">sunrise </div>
                  <div className="font-semibold">
                    {forecastdays.forecastday[0].astro.sunrise}
                  </div>
                </div>
                <div className="text-center">
                  <Sunset className="mx-auto mb-2 text-orange-600" />
                  <div className="text-sm text-gray-600">Sunset</div>
                  <div className="font-semibold">
                    {forecastdays.forecastday[0].astro.sunset}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <Droplets className="mx-auto mb-2 text-blue-500" />
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{current.humidity}%</div>
              </div>
              <div className="text-center">
                <Wind className="mx-auto mb-2 text-gray-500" />
                <div className="text-sm text-gray-600">Wind</div>
                <div className="font-semibold">{current.wind_kph} km/h</div>
              </div>
              <div className="text-center">
                <Gauge className="mx-auto mb-2 text-purple-500" />
                <div className="text-sm text-gray-600">Pressure</div>
                <div className="font-semibold">{current.pressure_mb} hPa</div>
              </div>
              <div className="text-center">
                <Eye className="mx-auto mb-2 text-teal-500" />
                <div className="text-sm text-gray-600">Visibility</div>
                <div className="font-semibold">{current.vis_km} km</div>
              </div>
            </div>
          </div>
          24-Hour Forecast
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Clock size={20} className="mr-2" />
              24-Hour Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastdays?.forecastday?.[0]?.hour || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={(t) => t.split(" ")[1]} />

                <YAxis
                  yAxisId="left"
                  domain={[
                    (dataMin) => Math.floor(dataMin - 2),
                    (dataMax) => Math.ceil(dataMax + 2),
                  ]}
                  label={{ value: "°C", angle: -90, position: "insideLeft" }}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  label={{
                    value: "% Rain",
                    angle: -90,
                    position: "insideRight",
                  }}
                />

                <Tooltip />
                <Legend />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temp_c"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  name="Temperature (°C)"
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="chance_of_rain"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  name="Precipitation (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/*  7-Day Forecast */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar size={20} className="mr-2" />
              7-Day Forecast
            </h3>

            <div className="grid grid-cols-7 gap-2">
              {console.log("for", forecastdays)}

              {forecastdays?.forecastday?.map((day, idx) => (
                <div
                  key={idx}
                  className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg"
                >
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    {day.date}
                  </div>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-10 h-10 mx-auto"
                  />
                  <div className="mt-2 text-xs">
                    <div className="font-bold">{day.day.maxtemp_c}°</div>
                    <div className="text-gray-600">{day.day.mintemp_c}°</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*  Temperature Trends */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-black flex items-center">
              <TrendingUp size={20} className="mr-2" />
              Temperature Trends
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getTemperatureTrends(forecastdays)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temp_max" fill="#f59e0b" name="Max Temp" />
                <Bar dataKey="temp_min" fill="#3b82f6" name="Min Temp" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
