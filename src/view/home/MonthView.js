import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useTheme } from "@react-navigation/native";
import { FONTS, SIZES } from "../../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import DayView from "./DayView";
import HeaderText from "./component/HeaderText";
import FilterButton from "./component/FilterButton";
import Calendar from "./component/CalendarItem";
import AgendaItem from "./component/AgendaItem";

export default function MonthView({ navigation }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSvg />

      {/* <Calendar
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          zIndex: 1,
          borderWidth: 1,
          borderColor: 'gray',
          height: 400
        }}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
        }}
      /> */}

      <View
        style={[
          styles.calendarContainer,
          {
            width: width, 
            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        {/* <Calendar /> */}

        <AgendaItem />
      </View>

      <View
        style={{
          marginTop: 98,
          marginBottom: SIZES.large,
          paddingHorizontal: SIZES.small,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <FilterButton
          label={"Jour"}
          onPress={() => navigation.navigate("DayView")}
        />
        <FilterButton label={"Mois"} active={true} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}></View>
      </ScrollView>

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
  calendarContainer: {
    position: "absolute",
    zIndex: 1,
    paddingTop: SIZES.small,
  },
});
