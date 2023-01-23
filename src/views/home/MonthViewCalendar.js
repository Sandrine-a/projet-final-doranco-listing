import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import moment from "moment";

import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import DayView from "./DayView";
import HeaderText from "./component/HeaderText";
import FilterButton from "./component/FilterButton";
import Calendar from "./component/CalendarItem";
import { calendarStore, setDay } from "../../store/calendarStore";
import { useStore } from "@nanostores/react";
import DayBoard from "./component/DayBoard";
import { setOnlyCloseButton, setViewActive } from "../../store/bottomTabNavStore";

export default function MonthView({ navigation }) {
  const { width, height } = useWindowDimensions();
  const { tasksList, day, month } = useStore(calendarStore);

  const viewRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const scrollViewRef = useRef(null);

  const [isMeasured, setIsMeasured] = useState(false);

  useEffect(() => {
    setOnlyCloseButton(false);
    setViewActive({name: "dayView", active: true})
    return () => {
      setViewActive({name: "dayView", active: false})
    };
  }, [tasksList, month]);

  useEffect(() => {
    if (viewRef.current && scrollViewRef.current) {
      // /* Mesure et ramene au top de la View du jour viewRef */
      // viewRef.current.measure((x, y, width, height, pageX, pageY) => {
      //   console.log(
      //     `View dimensions: x: ${x}, y: ${y}, width: ${width}, height: ${height}, pageX: ${pageX}, pageY: ${pageY}`
      //   );
      //   setIsMeasured(true);
      //   slowlyScrollDown(y);
      // });

      /* Mesure et ramene au top de la View du jour viewRef par rapport à la scrollView*/
      viewRef.current.measureLayout(
        scrollViewRef.current,
        (left, top, width, height) => {
          setIsMeasured(true);
          slowlyScrollDown(top);
        }
      );
    }
    return () => {};
  }, [isMeasured]);

  const slowlyScrollDown = (height) => {
    const y = height;
    scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
    setOffset(y);
  };

  let markedDay = tasksList
    .sort((a, b) => {
      a.day - b.day;
    })
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
              flex: 1,
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

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <View style={styles.cardsContainer}>
          {Object.keys(markedDay)
            .sort((a, b) => {
              if (new Date(a) === new Date(b)) {
                return a.time - b.time || a.time - b.time;
              } else {
                return new Date(a) - new Date(b);
              }
            })
            .map((key, index) => {
              if (moment.utc(key).format("MM") === month) {
                return (
                  <View
                    key={index}
                    ref={
                      moment.utc(key).format("YYYY-MM-DD") == day ||
                      moment.utc(key).format("YYYY-MM-DD") < day
                        ? viewRef
                        : null
                    }
                  >
                    <Text
                      style={[
                        styles.day,
                        {
                          color:
                            moment.utc(key).format("YYYY-MM-DD") == day
                              ? COLORS.TERTIARY
                              : COLORS.SECONDARY_DARK,
                        },
                      ]}
                    >
                      {moment.utc(key).format("dddd D MMMM")}
                    </Text>
                    {markedDay[key].map((item, index) => {
                      return (
                        <DayBoard task={item} key={`${item.day}_${index}`} />
                      );
                    })}
                  </View>
                );
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
  day: {
    fontFamily: FONTS.mukta.bold,
    fontSize: SIZES.base + 2,
    textTransform: "capitalize",
    paddingLeft: SIZES.small,
  },
});
