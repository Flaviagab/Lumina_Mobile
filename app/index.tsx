import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {

  return (

      <ScrollView>
        <View
          style={
            [styles.container]
          }>
            


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