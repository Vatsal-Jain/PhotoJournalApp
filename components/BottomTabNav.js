import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors } from "../Global/style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomNav = () => {
  const navigation = useNavigation();

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

  const mon = monthsName[date.getMonth()].toUpperCase().slice(0, 3);
  const dt = date.getDate();

  const [imageList, setImageList] = useState([]);

  const getPhotos = () => {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((data) => {
        setImageList(data);
      });
    });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    newMemoryCheck();
  }, [imageList.length + 1]);

  const [check, setCheck] = useState(true);

  const newMemoryCheck = () => {
    imageList.forEach((ket) => {
      const pp = JSON.parse(ket[1]);

      const nn = pp.dt;
      const mm = pp.mon;
    
      if (nn === dt && mm === mon) {
        console.log("comapre");
        setCheck(false);
      }
    });

  };

  return (
    <View style={styles.container}>
      <View style={styles.btncon1}>
        <MaterialCommunityIcons
          name="home-variant"
          size={24}
          color="grey"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("home");
          }}
        />
      </View>
      {check == true ? (
        <TouchableOpacity
          style={styles.btncon2}
          onPress={() => {
            navigation.navigate("second");
          }}
        >
          <Entypo name="plus" size={24} color="#36A2F1" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.btncon3}
          onPress={() => {
            alert("You can take new memory on tommorow");
          }}
        >
          <Text>Wait</Text>
        </TouchableOpacity>
      )}

      {/* } */}

      <View style={styles.btncon1}>
        <MaterialIcons
          name="info-outline"
          size={24}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("info");
          }}
        />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    elevation: 30,
    borderTopColor: "white",
    borderTopWidth: 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  icon1: {
    color: "#2f3832",
  },
  icon2: {
    color: "blue",
  },
  btncon2: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: -15,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 60,

    elevation: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  btncon1: {
    backgroundColor: colors.col1,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btncon3: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: -15,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 60,

    elevation: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
});
