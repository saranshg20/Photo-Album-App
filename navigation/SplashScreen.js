import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Animated } from "react-native";

export const SplashScreen = ({ navigation }) => {
    const leftPosition = new Animated.Value(-100);
    const rightPosition = new Animated.Value(100);

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("HomeScreen");
        }, 1500);
        Animated.sequence([
            Animated.parallel([
                Animated.spring(leftPosition, {
                    toValue: -24.5,
                    speed: 1,
                    bounciness: 5,
                    useNativeDriver: true,
                }),
                Animated.spring(rightPosition, {
                    toValue: 25,
                    speed: 1,
                    bounciness: 5,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [navigation]);

    return (
        <Animated.View style={styles.container}>
            <Animated.Text
                style={{
                    transform: [{ translateX: leftPosition }],
                    position: "absolute",
                    fontFamily: "Pacifico",
                    fontSize: 24,
                }}
            >
                Cap
            </Animated.Text>
            <Animated.Text style={{ transform: [{ translateX: rightPosition }], position:"absolute", fontFamily: "Pacifico", fontSize: 24 }}>
                View
            </Animated.Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Pacifico",
    },
});
