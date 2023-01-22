import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, TEXT_COLOR } from "../theme";

export default function Loader() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", marginVertical: SIZES.base }}>
      <Text
        style={{
          textAlign: "center",
          color: TEXT_COLOR.SECONDARY,
          fontWeight: "bold",
          fontFamily: FONTS.mukta.medium,
          fontSize: SIZES.base,
          marginVertical: SIZES.large,
        }}
      >
        Chargement en cours...
      </Text>
      <Image
        source={require("../../assets/logo.png")}
        style={{ height: 70 }}
        resizeMode={"contain"}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
