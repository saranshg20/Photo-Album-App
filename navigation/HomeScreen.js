import { Pressable, Text, View } from "react-native";
import { styles } from "../style";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect, useContext, useCallback } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ImageCollectionComponent } from "../components/ImageCollection.Component";
import { useIsFocused } from "@react-navigation/native";
import { DatabaseContext } from "../contexts/Database.context";

/**
 * @param navigation is included in every screen inside the Stack.Navigator
 * @returns Home-Screen consisting of button to direct to CameraScreen and ImageCollectionComponent
 */
export const Home = ({ navigation }) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [mediaPermission, setMediaPermission] = useState(null);
    const { db, fetchDBTables } = useContext(DatabaseContext);

    // To rerender- whenever user returns to Home-Screen
    const isFocused = useIsFocused();

    useEffect(() => {
        // Request for permissions in initial mount
        const getPermissions = async () => {
            if (cameraPermission == null || cameraPermission.status != "granted") {
                const _cameraPermission = await Camera.requestCameraPermissionsAsync();
                setCameraPermission(_cameraPermission.status == "granted");
            }

            if (mediaPermission == null || mediaPermission.status != "granted") {
                const _mediaPermission = await MediaLibrary.requestPermissionsAsync();
                setMediaPermission(_mediaPermission.status == "granted");
            }
        };

        getPermissions();
    }, []);

    const fetchData = async () => {
        const result = await fetchDBTables(db);
        return result;
    };

    return (
        <View style={styles.container}>
            <ImageCollectionComponent fetchData={fetchData} navigation={navigation} />
            <Pressable style={styles.cameraButton} onPress={() => navigation.navigate("Camera")}>
                <Entypo name="camera" size={24} color="white" />
            </Pressable>
        </View>
    );
};
