import { CameraView, useCameraPermissions } from "expo-camera/next";
import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export function CameraScreen() {
  const camera = useRef(null);
  const [facing, setFacing] = useState("back");
  const [isFlashOn, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const _requestPermission = async () => {
      await requestPermission();
    };

    if (permission == null || permission.granted == null) {
      _requestPermission();
    }
  }, []);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash(!isFlashOn);
  };

  const takePicture = async () => {
    const data = await camera.current.takePictureAsync(null);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing} flash={isFlashOn ? "on" : "off"}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clickPictureButton} onPress={takePicture} />
          <FontAwesome6
            name="camera-rotate"
            size={24}
            style={styles.rotateCameraIcon}
            color="white"
            onPress={toggleCameraFacing}
          />
          {isFlashOn ? (
            <Ionicons name="flash" size={24} style={styles.flashIcon} color="white" onPress={toggleFlash} />
          ) : (
            <Ionicons name="flash-off" size={24} style={styles.flashIcon} color="white" onPress={toggleFlash} />
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  clickPictureButton: {
    position: "",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
  },
  rotateCameraIcon: {
    position: "absolute",
    left: 10,
    bottom: 18,
  },
  flashIcon: {
    position: "absolute",
    right: 10,
    bottom: 18,
  },
});
