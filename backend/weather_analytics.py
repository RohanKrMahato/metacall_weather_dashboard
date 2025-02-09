import statistics

def get_weather_stats(weather_data):

    temps = [weather_data["main"]["temp"], weather_data["main"]["temp_min"], weather_data["main"]["temp_max"],weather_data["main"]["feels_like"]]
    avg_temp = round(statistics.mean(temps), 2)    
    return {
        "average_temperature": avg_temp
    }
