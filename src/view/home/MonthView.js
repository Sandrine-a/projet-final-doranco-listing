import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import { FONTS, SIZES } from "../../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import DayView from "./DayView";
import HeaderText from "./component/HeaderText";
import FilterButton from "./component/FilterButton";

export default function MonthView({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
    <HeaderSvg />

    <View
      style={{
        marginVertical: SIZES.large,
        paddingHorizontal: SIZES.small,
        flexDirection: "row",
        // justifyContent: "space-between",
        justifyContent: "space-evenly"
      }}
    >
      <FilterButton label={"Jour"} onPress={()=> navigation.navigate('DayView')}/>
      <FilterButton label={"Mois"} />
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cardsContainer}>
        
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
