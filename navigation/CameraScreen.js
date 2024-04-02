import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useEffect, useRef, useState } from "react";
import { Pressable, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../style";
import { ImageBackground } from "react-native";

export function CameraScreen() {
  const camera = useRef(null);
  const [facing, setFacing] = useState("back");
  const [isFlashOn, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [previewImage, setPreviewImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

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
    if (!data) {
      return;
    }

    setPreviewImage(true);
    setCapturedImage(data);
  };

  // Preview Component
  const CameraPreview = ({ photo }) => {
    return (
      <View style={styles.cameraPreview}>
        <ImageBackground source={{ uri: photo && photo.uri }} style={{ flex: 1 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10
      }}>
          <Pressable style={ [styles.button, styles.previewButton] } onPress={() => setPreviewImage(false)}>
            <Text style={styles.text}>Retake</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.previewButton]} onPress={() => {}}>
            <Text style={styles.text}>Save Image</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cameraContainer}>
      {previewImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
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
      )}
    </View>
  );
}
