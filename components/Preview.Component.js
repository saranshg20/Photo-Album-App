import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { styles } from "../style";
import { ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import { DatabaseContext } from "../contexts/Database.context";

/**
 * @param setPreviewImage to set the preview image screen
 * @param capturedImage to set the image filepath
 * @returns a preview-image screen, contains options to retake and save image
 */
export const PreviewComponent = ({ setPreviewImage, capturedImage }) => {
    const { db, insertIntoDB, fetchDBTables, clearDB } = useContext(DatabaseContext);

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
            insertIntoDB(db, newLocation);
            fetchDBTables(db);
            setPreviewImage(false);
        } catch (error) {
            console.log("Error while saving image:", error);
        }
    };

    return (
        <View style={styles.cameraPreview}>
            <ImageBackground source={{ uri: capturedImage && capturedImage.uri }} style={{ flex: 1 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <TouchableOpacity style={[styles.button, styles.previewButton]} onPress={() => setPreviewImage(false)} activeOpacity={0.5}>
                    <Text style={styles.text}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.previewButton]} onPress={saveImage} activeOpacity={0.5}>
                    <Text style={styles.text}>Save Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
