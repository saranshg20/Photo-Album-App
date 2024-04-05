import { View, Text } from "react-native";
import { useRef, useState } from "react";
import { styles } from "../style";
import { CameraView } from "expo-camera/next";
import { TouchableOpacity } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

export const CameraComponent = ({setCapturedImage, setPreviewImage}) => {
  const camera = useRef(null);
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");

  const toggleCameraFacing = () => {
    setFacing(facing == "back" ? "front" : "back");
  };

  const toggleFlash = () => {
    setFlash(flash == "on" ? "off" : "on");
  };

  const clickPicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);

      if (!data) {
        return;
      }

      setPreviewImage(true);
      setCapturedImage(data);
    } else {
      console.log("Camera not found");
    }
  };

  return (
    <View style={styles.cameraContainer}>
      <CameraView ref={camera} style={styles.camera} facing={facing} flash={flash ? "on" : "off"}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clickPictureButton} onPress={clickPicture} />
          <FontAwesome6
            name="camera-rotate"
            size={24}
            style={styles.rotateCameraIcon}
            color="white"
            onPress={toggleCameraFacing}
          />
          {flash ? (
            <Ionicons name="flash" size={24} style={styles.flashIcon} color="white" onPress={toggleFlash} />
          ) : (
            <Ionicons name="flash-off" size={24} style={styles.flashIcon} color="white" onPress={toggleFlash} />
          )}
        </View>
      </CameraView>
    </View>
  );
};
