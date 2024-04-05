import { Pressable, Text, View } from "react-native";
import { styles } from "../style";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { DatabaseContext } from "../contexts/Database.context";

export const Home = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);

  useEffect(() => {
    // Request for permissions in initial mount
    const getPermissions = async () => {
      if (cameraPermission == null || cameraPermission.status != "granted") {
        const _cameraPermission = await Camera.requestCameraPermissionsAsync();
        // console.log("Camera Permission", _cameraPermission);
        setCameraPermission(_cameraPermission.status == "granted");
      }

      if (mediaPermission == null || mediaPermission.status != "granted") {
        const _mediaPermission = await MediaLibrary.requestPermissionsAsync();
        // console.log("Media Permission", _mediaPermission);
        setMediaPermission(_mediaPermission.status == "granted");
      }
    };

    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.cameraButton} onPress={() => navigation.navigate("Camera")}>
        <Entypo name="camera" size={24} color="white" />
      </Pressable>
    </View>
  );
};
