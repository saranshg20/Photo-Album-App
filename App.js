import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./navigation/HomeScreen";
import { ImageCollectionScreen } from "./navigation/ImageCollectionScreen";
import { CameraScreen } from "./navigation/CameraScreen";
import { useFonts } from "expo-font";
import { ActivityIndicator, Text, View } from "react-native";

const Stack = createNativeStackNavigator();
const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Pacifico': require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ title: "CapView", headerTitleStyle: { fontFamily: "Pacifico" }, statusBarColor: "black" }}
        />
        <Stack.Screen name="Profile" component={ImageCollectionScreen} />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false, statusBarHidden: false, statusBarColor: "black" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
