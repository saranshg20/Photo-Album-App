import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "../style";
import { ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";

// Preview Component
export const PreviewComponent = ({ setPreviewImage, capturedImage }) => {
    //create directory if not exists
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
            const newLocation =  FileSystem.documentDirectory + capturedImage.uri.split('/').pop();
            // await createDirectory(newLocation);

            await FileSystem.copyAsync({
                from: capturedImage.uri,
                to: newLocation,
              });
              console.log("Saving location", newLocation.replace('file://', ''));
        } catch (error) {
            console.log("Error while saving image:", error);
        }
    }

  return (
    <View style={styles.cameraPreview}>
      <ImageBackground source={{ uri: capturedImage && capturedImage.uri }} style={{ flex: 1 }} />
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
