import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import Welcome from "./Welcome";

export default function Camerascreen() {
  const navigation = useNavigation();

  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const imgarray = [];

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    //console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  const deleteImage = async () => {
    setImageUri("");
  };

  const yes = () => {
    imgarray.push(imageUri);

    navigation.navigate("third", { imageUri });
  };

  return (
    <View style={styles.container}>
      <Welcome />
      {!imageUri && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={"1:1"}
          />
        </View>
      )}
    

      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}

      {imageUri && (

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity style={styles.btncon1} onPress={deleteImage}>
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>

    

          <TouchableOpacity style={styles.btncon1} onPress={yes}>
            <AntDesign name="like1" size={24} color="#36A2F1" />
          </TouchableOpacity>
        </View>
      )}

      {!imageUri && (
        <TouchableOpacity style={styles.btncon1} onPress={takePicture}>
          <MaterialIcons name="camera" size={24} color="#36A2F1" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.3,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  btncon1: {
    backgroundColor: "white",
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    position: "relative",
    top: -15,
  },
  icon2: {
    color: "blue",
  },
});
