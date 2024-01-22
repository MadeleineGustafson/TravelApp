import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  const handleSearch = () => {
    // Call the search function only when the user submits the form
    search();
  };

  const renderWeatherIcon = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return null; // Return null or a default icon if weather data is not available
    }

    const description = weatherData.weather[0].description;

    // Define a mapping of weather descriptions to icons
    const iconMapping = {
      "clear sky": <MaterialIcons name="wb-sunny" size={60} color="yellow" />,
      "few clouds": <MaterialIcons name="wb-cloudy" size={60} color="white" />,
      "scattered clouds": (
        <Ionicons name="partly-sunny" size={60} color="white" />
      ),
      "broken clouds": <Ionicons name="partly-sunny" size={60} color="white" />,
      "shower rain": <Ionicons name="rainy" size={60} color="#74aae8" />,
    };

    // Return the corresponding icon based on the description
    return iconMapping[description] || null;
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.inputfield}
          placeholder="Write your location"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText} onPress={handleSearch}>
            <MaterialIcons name="search" size={25} color="#163532" />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render weather data if available */}
      {weatherData && (
        <View style={styles.weatherDataContainer}>
          <Text style={styles.location}>{weatherData.name}</Text>

          <View style={styles.iconContainer}>{renderWeatherIcon()}</View>
          <Text style={styles.weather}>
            {weatherData.weather[0].description}
          </Text>
          <Text style={styles.temp}>{weatherData.main.temp} c°</Text>
          <View
            style={{
              flexDirection: "row",
              widht: 200,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infotext}>
              Feels like: {weatherData.main.feels_like}c°
            </Text>

            <Text style={styles.infotextwind}>
              Wind: {weatherData.wind.speed} km/h
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
    width: 200,
    borderRadius: 20,
    fontFamily:"Poppins-Regular",
    backgroundColor: "#EDF2E1",
    marginBottom: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#D1FFA0",
    borderRadius: 20,
    width: 60,
    marginBottom: 10,
    padding: 10,
  },
  submitButtonText: {
    textAlign: "center",
  },
  weatherDataContainer: {
    marginTop: 20,
  },
  location: {
    fontSize: 30,
    fontFamily:"Poppins-Regular",
    color: "#EDF2E1",
    margin: 10,
    textAlign: "center",
  },
  temp: {
    fontSize: 45,
    color: "#D1FFA0",
    textAlign: "center",
    fontFamily:"Poppins-Bold",
    margin: 20,
  },
  infotext: {
    fontSize: 13,
    fontFamily:"Poppins-Regular",
    color: "#EDF2E1",
    textAlign: "center",
    paddingRight: 10,
  },
  infotextwind: {
    fontSize: 13,
    fontFamily:"Poppins-Regular",
    color: "#EDF2E1",
    textAlign: "center",
    paddingLeft: 10,
  },
  weather: {
    fontSize: 20,
    fontFamily:"Poppins-Regular",
    color: "#EDF2E1",
    textAlign: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default WeatherScreen;
