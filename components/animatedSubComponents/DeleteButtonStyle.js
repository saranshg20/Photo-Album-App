import { Platform, StyleSheet } from "react-native";

const BUTTON_HEIGHT = 45;

export const styles = StyleSheet.create({
    button: {
        height: BUTTON_HEIGHT,
        elevation: 3,
        paddingHorizontal: 15,
        backgroundColor: "black",
        borderRadius: 4,
        overflow: "hidden",
        justifyContent: "center",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 100,
        width: 100,
    },
    labelContainer: {
        position: "absolute",
        height: BUTTON_HEIGHT,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        left: 25,
    },
    letterContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    letter: {
        color: "white",
        fontFamily: "Pacifico",
        fontWeight: "bold",
        marginRight: Platform.select({ ios: 0, android: 1 }),
    },
    top: {
        alignItems: "center",
        justifyContent: "center",
    },
    bottom: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
});
