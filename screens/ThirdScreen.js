import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
// import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "./Welcome";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";

const ThirdScreen = () => {
  const wid = useWindowDimensions().width;

  const navigation = useNavigation();
  const route = useRoute();
  const src = route.params.imageUri;

  const storeData = () => {
    let data = { src, thought, temperature, mon, dt, text };

    if (src && thought && temperature && dt && mon && text) {
      AsyncStorage.setItem(src, JSON.stringify(data))
        .then(() => console.log("davasaved"), navigation.navigate("home"))
        .catch((err) => console.log(err));
    } else {
      alert("In a hurry? Please enter Thoughts before Submitting");
    }
  };
  var date = new Date();
  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      getWeather("delhi");

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          let address = `${item.city}, ${item.country}`;

          setLocation(address);
        }
      }
    })();
  }, []);

  let text = "Fetching your location..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }

  const [temperature, setTemperature] = useState("");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db89694597msha2b007d94daafc3p123e9cjsn1369adba66bb",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  const getWeather = (city) => {
    fetch(
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        //   console.log(response)

        setTemperature(response.temp);
      })
      .catch((err) => console.error(err));
  };

  const [thought, setThought] = useState("");

  const mon = monthsName[date.getMonth()].toUpperCase().slice(0, 3);
  const dt = date.getDate();

  return (
    <View style={styles.container}>
      <Welcome />
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: src }}
          style={{ width: wid, alignSelf: "center", height: 200 }}
        >
          <View style={{ position: "absolute", padding: 10 }}>
            <Text style={{ color: "white", fontSize: 18, marginVertical: 5 }}>
              {mon}
            </Text>
            <Text style={{ color: "white", fontSize: 26 }}>{dt}</Text>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              bottom: 5,
              padding: 15,
              position: "absolute",
            }}
          >
            {text}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              bottom: 5,
              right: 0,
              padding: 15,
              position: "absolute",
            }}
          >
            {temperature}
            {String.fromCodePoint(8451)}
          </Text>

          {text != "Fetching your location.." ? (
            <TouchableOpacity style={styles.iconStyle} onPress={storeData}>
              <MaterialIcons
                name="camera"
                size={24}
                style={{ color: "#36A2F1" }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconStyle}>
              <ActivityIndicator size="small" color="#36A2F1" />
            </TouchableOpacity>
          )}
        </ImageBackground>

        <TextInput
          placeholder="enter your thoughts"
          style={styles.inputText}
          numberOfLines={3}
          onChangeText={(text) => setThought(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  iconStyle: {
    backgroundColor: "white",
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    position: "relative",
    bottom: -20,
    position: "absolute",
  },
  inputText: { padding: 10, fontSize: 18, margin: 20 },
});

export default ThirdScreen;
