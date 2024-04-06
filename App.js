import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./navigation/HomeScreen";
import { CameraScreen } from "./navigation/CameraScreen";
import { useFonts } from "expo-font";
import { ActivityIndicator, Text, View } from "react-native";
import { DatabaseProvider } from "./contexts/Database.context";
import FullImageScreen from "./navigation/FullImageScreen";

const Stack = createNativeStackNavigator();
const App = () => {
    const [fontsLoaded, fontError] = useFonts({
        Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
        icon: require("./assets/fonts/icomoon.ttf"),
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // Screen transition configuration
    const screenTransitionConfig = {
        gestureDirection: "horizontal",
        transitionSpec: {
            open: {
                animation: "timing",
                config: {
                    duration: 500,
                },
            },
            close: {
                animation: "timing",
                config: {
                    duration: 500,
                },
            },
        },
        cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        }),
    };

    return (
        <DatabaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={Home}
                        options={{
                            title: "CapView",
                            headerTitleStyle: { fontFamily: "Pacifico" },
                            statusBarColor: "black",
                            alignItems: "center",
                            presentation: "modal",
                            animationTypeForReplace: "push",
                            animation: "slide_from_right",
                        }}
                    />
                    <Stack.Screen
                        name="FullImageScreen"
                        component={FullImageScreen}
                        options={{
                            title: "Gallery",
                            headerTitleStyle: { fontFamily: "Pacifico" },
                            statusBarColor: "black",
                            alignItems: "center",
                            presentation: "modal",
                            animationTypeForReplace: "push",
                            animation: "slide_from_left",
                        }}
                    />
                    <Stack.Screen
                        name="Camera"
                        component={CameraScreen}
                        options={{
                            headerShown: false,
                            statusBarHidden: false,
                            statusBarColor: "black",
                            presentation: "modal",
                            animationTypeForReplace: "push",
                            animation: "slide_from_bottom",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DatabaseProvider>
    );
};

export default App;
