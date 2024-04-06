import { View, Text, Image, TouchableOpacity, InteractionManager, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../style";

/**
 * @param filepath
 * @param navigation [A react-native navigation function] to handle navigation across stack containers/screen
 * @param initialIdx to begin image preview in gallery screen with currently selected image
 * @param data an array of images data containing id and filepath
 * @returns a single component consisting of single image
 */
export const SingleImageComponent = ({ filepath, navigation, initialIdx, data }) => {
    // Animate the images in the grid-view
    const scale = new Animated.Value(1);
    const [fadeAnim] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            InteractionManager.runAfterInteractions(() => {
                navigation.navigate("FullImageScreen", { filepath, initialIdx, data });
            });
        });
    };

    return (
        <TouchableOpacity style={styles.imageTouchableContainer} onPress={handlePress} activeOpacity={0.7}>
            <Animated.Image source={{ uri: filepath }} style={{ ...styles.image, opacity: fadeAnim }} />
        </TouchableOpacity>
    );
};
