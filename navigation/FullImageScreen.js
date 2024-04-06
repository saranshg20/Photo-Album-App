import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "../style";
import { ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import DeleteButton from "../components/animatedSubComponents/DeleteButton";

const FullImageScreen = ({ route }) => {
    const { filepath, data, initialIdx } = route.params;

    return (
        <View style={styles.cameraPreview}>
            <Swiper index={initialIdx} activeDotColor="white" showsButtons={false}>
                {data.map((image, index) => (
                    <View key={index} style={styles.cameraPreview}>
                        <ImageBackground source={{ uri: image.path }} style={{ flex: 1 }} />
                    </View>
                ))}
            </Swiper>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <DeleteButton />
            </View>
        </View>
    );
};

export default FullImageScreen;
