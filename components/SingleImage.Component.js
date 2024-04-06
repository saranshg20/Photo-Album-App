import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../style";

export const SingleImageComponent = ({ filepath, navigation, initialIdx, data }) => {
    const handlePress = () => {
        navigation.navigate('FullImageScreen', { filepath, initialIdx, data });
    };

    return (
        <TouchableOpacity style={styles.imageTouchableContainer} onPress={handlePress}>
            <Image source={{ uri: filepath }} style={styles.image} />
        </TouchableOpacity>
    );
};
