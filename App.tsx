import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex items-center justify-center grow">
      <Text>Criando branch de develop</Text>
      <StatusBar style="auto" />
    </View>
  );
}
