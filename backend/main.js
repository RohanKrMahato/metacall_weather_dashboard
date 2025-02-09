const express = require("express");
const cors = require("cors");

const { get_weather_stats } = require("./weather_analytics.py");

const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const WEATHER_API_KEY = "your_api_key_here";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

app.post("/weather", async (req, res) => {
    try {
        const { city } = req.body;
        const response = await axios.get(`${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;

        const analytics = await get_weather_stats(weatherData);
        console.log({
            ...weatherData,
            analytics
        });

        res.json({
            ...weatherData,
            analytics
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
