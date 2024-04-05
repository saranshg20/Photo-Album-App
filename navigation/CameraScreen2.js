import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useEffect, useRef, useState } from "react";
import { Pressable, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../style";
import { ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

export function CameraScreen() {
  // Camera
  const camera = useRef(null);
  const [facing, setFacing] = useState("back");
  const [isFlashOn, setFlash] = useState(false);

  // Image
  const [previewImage, setPreviewImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // connect with db and verify if table exist
  const db = SQLite.openDatabase("db.db");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT);",
      [],
      () => console.log("Table created successfully"),
      (_, error) => console.log("Error when creating table", error),
    );
  });

  const getTableData = () => {
    console.log('Starting transaction');
    db.transaction(tx => {
      console.log('Executing SQL query');
      tx.executeSql(
        'SELECT * FROM images;',
        [],
        (_, { rows }) => console.log('Rows', JSON.stringify(rows)),
        (_, error) => console.log('Error when selecting', error),
      );
    }, error => {
      console.log('Transaction failed', error);
    }, () => {
      console.log('Transaction successful');
    });
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash(!isFlashOn);
  };

  const takePicture = async () => {
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

  const createDirectory = async (dirPath) => {
    try {
      const info = await FileSystem.getInfoAsync(dirPath);
      console.log("E");
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
        console.log('Directory created at', dirPath);
      } else {
        console.log('Directory already exists at', dirPath);
      }
    } catch (error) {
      console.error('Error when creating directory', error);
    }
  };
  

  const saveImage = async () => {
    try {
      const newLocation = FileSystem.documentDirectory + capturedImage.uri.split('/').pop();
      console.log(newLocation);
      await createDirectory('/storage/emulated/0/DCIM/CapView/');
      console.log("D");
  
      await FileSystem.moveAsync({
        from: capturedImage.uri,
        to: newLocation,
      });
  
      console.log("Saving location", newLocation.replace('file://', ''));
      getTableData();
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO images (path) VALUES (?);",
          [newLocation],
          (_, { rows }) => console.log("Rows", JSON.stringify(rows)),
          (_, error) => console.log("Error when inserting", error),
        );
      });
    } catch (error) {
      console.log("Error when saving image location", error);
    }
  };

  // Preview Component
  const CameraPreview = ({ photo }) => {
    return (
      <View style={styles.cameraPreview}>
        <ImageBackground source={{ uri: photo && photo.uri }} style={{ flex: 1 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
          <Pressable style={[styles.button, styles.previewButton]} onPress={() => setPreviewImage(false)}>
            <Text style={styles.text}>Retake</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.previewButton]} onPress={saveImage}>
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
