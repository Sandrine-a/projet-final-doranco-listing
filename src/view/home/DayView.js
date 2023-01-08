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
import { useStore } from "@nanostores/react";
import { calendarStore } from "../../../store/calendarStore";

export default function DayView({ navigation }) {

  const { tasksList } = useStore(calendarStore)

  console.log(tasksList);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSvg />
      <HeaderText />

      <View
        style={{
          marginTop: 98,
          marginBottom: SIZES.large,
          paddingHorizontal: SIZES.small,
          flexDirection: "row",
          // justifyContent: "space-between",
          justifyContent: "space-evenly"
        }}
      >
        <FilterButton label={"Jour"} active={true} />
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
