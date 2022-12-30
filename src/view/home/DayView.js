import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import { FONTS, SIZES } from "../../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import HeaderText from "./component/HeaderText";
import FilterButton from "./component/FilterButton";
import DayBoard from "./component/DayBoard";

export default function DayView({ navigation }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSvg />
      <HeaderText />

      <View
        style={{
          marginVertical: SIZES.large,
          paddingHorizontal: SIZES.small,
          flexDirection: "row",
          // justifyContent: "space-between",
          justifyContent: "space-evenly"
        }}
      >
        <FilterButton label={"Jour"} />
        <FilterButton label={"Mois"} onPress={()=> navigation.navigate('MonthView')}/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          <DayBoard />
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
