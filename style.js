import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera_container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    margin: 64,
  },
  clickPictureButton: {
    position: "",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
  },
  rotateCameraIcon: {
    position: "absolute",
    left: 10,
    bottom: 18,
  },
  flashIcon: {
    position: "absolute",
    right: 10,
    bottom: 18,
  },
  cameraPreview: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  previewButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
  }
});
