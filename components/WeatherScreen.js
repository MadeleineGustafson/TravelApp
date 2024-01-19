import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function WeatherScreen() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const openWeatherKey = "54cb9f7bd3775537e7736c0c2bec3b9c";

  const search = async () => {
    if (city === "") {
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${openWeatherKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // Handle the fetched data as needed
      console.log("Weather data:", data);

      // Set the weather data in the state
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.inputfield}
          placeholder="Type something..."
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText} onPress={search}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render weather data if available */}
      {weatherData && (
        <View style={styles.weatherDataContainer}>
          <Text style={styles.location}>{weatherData.name}</Text>
          <Text style={styles.weather}>
            {weatherData.weather[0].description}
          </Text>
          <Text style={styles.temp}>{weatherData.main.temp}C</Text>
          <View
            style={{
              flexDirection: "row",
              widht: 200,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infotext}>
              Feels like: {weatherData.main.feels_like} C
            </Text>

            <Text style={styles.infotext}>
              Wind: {weatherData.wind.speed} m/s
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputfield: {
    padding: 10,
    width: 150,
    borderRadius: 20,
    backgroundColor: "#EDF2E1",
    marginBottom: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#D1FFA0",
    borderRadius: 20,
    width: 90,

    marginBottom: 10,
    padding: 10,
  },
  submitButtonText: {
    color: "#163532",
    textAlign: "center",
  },
  weatherDataContainer: {
    marginTop: 20,
  },
  location: {
    fontSize: 30,
    color: "#EDF2E1",
    margin: 10,
    textAlign: "center",
  },
  temp: {
    fontSize: 50,
    color: "#D1FFA0",
    textAlign: "center",
  },
  infotext: {
    fontSize: 13,
    color: "#EDF2E1",
    textAlign: "center",
  },
  weather: {
    fontSize: 20,
    color: "#EDF2E1",
    textAlign: "center",
  },
});

export default WeatherScreen;
