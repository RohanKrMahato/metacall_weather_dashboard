<template>
    <div class="container">
        <h1>Metacall Weather Dashboard</h1>
        <div class="search">
            <input v-model="city" placeholder="Enter city" class="input" />
            <button @click="fetchWeather" class="button">Get Weather</button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        
        <div v-if="weather" class="weather-info">
            <div class="city-info">
                <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
                <div class="weather-icon">
                    <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" alt="weather-icon" />
                </div>
            </div>
            <div class="weather-details">
                <p><strong>Temperature:</strong> {{ weather.main.temp }}°C</p>
                <p><strong>Feels Like:</strong> {{ weather.main.feels_like }}°C</p>
                <p><strong>Min Temperature:</strong> {{ weather.main.temp_min }}°C</p>
                <p><strong>Max Temperature:</strong> {{ weather.main.temp_max }}°C</p>
                <p><strong>Wind Speed:</strong> {{ weather.wind.speed }} m/s</p>
                <p><strong>Average Temperature:</strong> {{ weather.analytics.average_temperature }}°C</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const city = ref("");
const weather = ref(null);
const error = ref("");

const fetchWeather = async () => {
    try {
        const response = await fetch("http://localhost:5000/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: city.value }),
        });

        if (!response.ok) throw new Error("Failed to fetch weather data");

        weather.value = await response.json();
        error.value = "";
    } catch (err) {
        error.value = err.message;
    }
};
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    background-color: #ffffff;
    color: #000000;
    text-align: center;
    padding: 20px;
    margin: 0;
}

.container {
    max-width: 450px;
    margin: 50px auto;
    padding: 30px;
    background-color: #ffffff; 
    border-radius: 8px;
    border: 1px solid #000000;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #000000;
}

.search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.input {
    width: 75%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #000000;
    font-size: 16px;
    background-color: #ffffff;
}

.button {
    width: 20%;
    padding: 12px;
    margin-left: 5px;
    background-color: #000000; 
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
}

.button:hover {
    background-color: #444444; 
}

.weather-info {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #000000; 
    text-align: left;
}

.city-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.city-info h2 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: bold;
    color: #000000;
}

.weather-icon img {
    width: 50px;
    height: 50px;
}

.weather-details p {
    font-size: 1.1rem;
    margin: 10px 0;
    color: #000000; 
}

.weather-details p strong {
    font-weight: bold;
}

.error {
    color: #f44336; 
    font-size: 1rem;
    margin-top: 10px;
}
</style>
