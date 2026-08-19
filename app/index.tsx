import { HomeHeader } from "@/components/HomeHeader";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {

  return (

      <ScrollView>
        <View
          style={
            [styles.container]
          }>
            
<HomeHeader
    userName="Ana Júlia"
    explore={() => router.push("/")}
    profile={() => router.push("/")}
/>

        </View>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})