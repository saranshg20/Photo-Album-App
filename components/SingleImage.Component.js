import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../style";

/**
 * @param filepath 
 * @param navigation [A react-native navigation function] to handle navigation across stack containers/screen
 * @param initialIdx to begin image preview in gallery screen with currently selected image
 * @param data an array of images data containing id and filepath
 * @returns a single component consisting of single image
 */
export const SingleImageComponent = ({ filepath, navigation, initialIdx, data }) => {
    const handlePress = () => {
        navigation.navigate("FullImageScreen", { filepath, initialIdx, data });
    };

    return (
        <TouchableOpacity style={styles.imageTouchableContainer} onPress={handlePress}>
            <Image source={{ uri: filepath }} style={styles.image} />
        </TouchableOpacity>
    );
};
