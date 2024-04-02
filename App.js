import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./navigation/Home";
import { ImageCollectionScreen } from "./navigation/ImageCollectionScreen";
import { CameraScreen } from "./navigation/CameraScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={Home} options={{ title: "CapView" }} />
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
