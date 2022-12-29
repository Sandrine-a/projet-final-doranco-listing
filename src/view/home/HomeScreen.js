import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import { FONTS, SIZES } from "../../../theme";
import HeaderSvg from "../../component/HeaderSvg";

export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSvg />

      <Text style={{ fontFamily: FONTS.mukta.bold, fontSize: SIZES.large, color: colors.text }}>
        HomeScreen
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
