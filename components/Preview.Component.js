import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "../style";
import { ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import { DatabaseContext } from "../contexts/Database.context";

// Preview Component
export const PreviewComponent = ({ setPreviewImage, capturedImage }) => {
    const { db, insertIntoDB, showDBTables, clearDB } = useContext(DatabaseContext);

    // save image in local storage of device
    const saveImage = async () => {
        try {
            const newLocation =
                FileSystem.documentDirectory +
                "images" +
                capturedImage.uri.substring(capturedImage.uri.lastIndexOf("/"));

            // Check if directory exists
            const info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "/images/");
            if (!info.exists) {
                const directoryPath = FileSystem.documentDirectory + "/images/";
                await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
            }

            await FileSystem.copyAsync({
                from: capturedImage.uri,
                to: newLocation,
            });
            console.log("Saving location", newLocation);
            insertIntoDB(db, newLocation);
            showDBTables(db);
            setPreviewImage(false);
        } catch (error) {
            console.log("Error while saving image:", error);
        }
    };

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
