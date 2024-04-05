import { View, Text } from "react-native";
import React, { useState } from "react";
import { CameraComponent } from "../components/Camera.Component";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { styles } from "../style";
import { PreviewComponent } from "../components/Preview.Component";

export const CameraScreen = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);

  return (
    <View style={styles.cameraContainer}>
      {previewImage ? (
          <PreviewComponent setPreviewImage={setPreviewImage} capturedImage={capturedImage}/>
          ) : (
          <CameraComponent setCapturedImage={setCapturedImage} setPreviewImage={setPreviewImage} />
      )}
    </View>
  );
};
