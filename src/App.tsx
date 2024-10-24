import "../global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex grow bg-white items-center justify-center">
      <Text>Criando branch de develop</Text>
      <StatusBar style="auto" />
    </View>
  );
}
