import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import { FONTS, SIZES } from "../../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import DayView from "./DayView";
import HeaderText from "./component/HeaderText";

export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSvg />
      <HeaderText />

      <ScrollView
        style={{ marginTop: 210 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <DayView />
        </View>
      </ScrollView>

      {/* <ScrollView stickyHeaderIndices={[0]} bounces={false}>
        <HeaderSvg />
        <DayView />
      </ScrollView> */}

      <BottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    paddingBottom: 80,
  },
});
