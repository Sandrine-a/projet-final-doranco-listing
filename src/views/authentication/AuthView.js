import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../theme";
import Form from "./component/Form";

export default function AuthView() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <View>
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
            resizeMode={"contain"}
          />
        </View>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboard}
          >
          <Form />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.xs,
  },
  logo: {
    width: 150,
  },
  keyboard: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#708090",
    padding: 8,
  },
});
