import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { styles } from "./style";

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Open Camera</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
