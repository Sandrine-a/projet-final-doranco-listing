import {
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from "react-native-safe-area-context";
  import moment from "moment";
  
  import { useTheme } from "@react-navigation/native";
  import { COLORS, FONTS, SIZES } from "../../../theme";
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
  
    const scrollViewRef = useRef();
    
    useEffect(() => {
      if (day) {
        // find position of the element to scroll to
        let y = 0;
        for (const key in markedDay) {
          if (key === day) {
            break;
          }
          y += /* height of each element */
        }
        scrollViewRef.current.scrollTo({x: 0, y, animated: true});
      }
      return () => {};
    }, [day, markedDay]);
  
    let markedDay = tasksList
      .sort((a, b) => a.day - b.day)
      .reduce(function (acc, obj) {
        let key = obj.day;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
  
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../../../assets/img/header.png")}
          resizeMode="cover"
          style={{ height: 210 }}
        >
          <View
            style={[
              styles.calendarContainer,
              {
                width: width,
                flex: 1,
              },
            ]}
          >
            <Calendar
              setDay={setDay}
              withDot={true}
              coloredBackground={false}
            />
          </View>
        </ImageBackground>
  
        <View
          style={{
            marginTop
  