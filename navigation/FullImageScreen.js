import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "../style";
import { ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import DeleteButton from "../components/animatedSubComponents/DeleteButton";
import { DatabaseContext } from "../contexts/Database.context";

/**
 * @param route inbuilt prop included when navigated to a screen from React-Navigation
 * @returns a Gallery screen to view the full size image
 */
const FullImageScreen = ({ route }) => {
    const { filepath, data, initialIdx } = route.params;
    const [imageData, setImageData] = useState(data);
    let images = data;
    let currentIndex = initialIdx;
    const { db, deleteFromDB } = useContext(DatabaseContext);

    // Delete Image from device and update the db
    const deleteImage = () => {
        try {
            const filepath = data[currentIndex].path;
            deleteFromDB(db, filepath);
            const newImageData = images.filter((image, index) => image.path !== filepath);
            setImageData(newImageData);
        } catch (error) {
            console.log("Error while deleting image:", error);
        }
    };

    return (
        <View style={styles.cameraPreview}>
            <Swiper
                index={initialIdx}
                activeDotColor="white"
                showsButtons={false}
                onIndexChanged={(index) => {
                    currentIndex = index;
                }}
            >
                {imageData.map((image, index) => (
                    <View key={index} style={styles.cameraPreview}>
                        <ImageBackground source={{ uri: image.path }} style={{ flex: 1 }} />
                    </View>
                ))}
            </Swiper>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <DeleteButton onAnimationComplete={deleteImage} currentIndex={currentIndex} />
            </View>
        </View>
    );
};

export default FullImageScreen;
