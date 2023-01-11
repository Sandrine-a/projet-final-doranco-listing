import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import moment from "moment";

import { useTheme } from "@react-navigation/native";
import { FONTS, SIZES } from "../../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import DayView from "./DayView";
import HeaderText from "./component/HeaderText";
import FilterButton from "./component/FilterButton";
import Calendar from "./component/CalendarItem";
import AgendaItem from "./component/AgendaItem";
import { calendarStore, setDay } from "../../../store/calendarStore";
import { useStore } from "@nanostores/react";
import DayBoard from "./component/DayBoard";

export default function MonthView({ navigation }) {
  const { width, height } = useWindowDimensions();
  const { tasksList, day, month } = useStore(calendarStore);

  useEffect(() => {
    return () => {};
  }, [tasksList, month]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/img/header.png")}
        resizeMode="cover"
        style={{ height: 210 }}
      >
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
              // height: 00
              flex: 1,

              // position: "absolute",
              // zIndex: 1,
              // paddingTop: SIZES.small,
              // backgroundColor: "red"
            },
          ]}
        >
          <Calendar
            setDay={setDay}
            withDot={true}
            coloredBackground={false} /* setMonth={setMonth} */
          />
        </View>
      </ImageBackground>

      <View
        style={{
          marginTop: 38,
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
        <View style={styles.cardsContainer}>
          {tasksList.map((item, index) => {
            /* Permet de filtrer l'affichage de la liste selon le mois du store des qu'elle est changee */
            if (moment(item.day).format("MM") === month) {
              return <DayBoard item={item} key={`${item.day}_${index}`} />;
            }
          })}
        </View>
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
    // position: "absolute",
    // zIndex: 1,
    // paddingTop: SIZES.small,
  },
});
