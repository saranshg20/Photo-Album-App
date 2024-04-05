import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../style";

export const SingleImageComponent = ({ filepath }) => {
    return (
        <TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={{ uri: filepath }} style={styles.image} />
                <Text style={styles.text}>Image</Text>
            </View>
        </TouchableOpacity>
    );
};
