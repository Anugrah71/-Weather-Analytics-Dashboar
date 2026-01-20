const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

client.on("error", (err) => console.error(" Redis Client Error", err));
client.on("connect", () => console.log(" Redis Connected Successfully"));

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Could not connect to redies");
  }
})();
//get the saved data from redies
const getCache = async (key) => {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};
//save the data in redies
const setCache = async (key, data, duration = 3600) => {
  try {
    await client.setEx(key, duration, JSON.stringify(data));
  } catch (err) {
    console.error("Redis set error", err);
  }
};

module.exports = { getCache, setCache };
