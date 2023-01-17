import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";
import { useStore } from "@nanostores/react";

import { COLORS, FONTS, SIZES, TEXT_COLOR } from "../../theme";
import HeaderSvg from "../../component/HeaderSvg";
import BottomTab from "../../component/BottomTab";
import HeaderText from "./component/HeaderText";
import FilterButton from "./component/FilterButton";
import DayBoard from "./component/DayBoard";

import { calendarStore, initHomePage, setDay } from "../../store/calendarStore";

export default function DayView({ navigation }) {
  const { tasksList, day, loading } = useStore(calendarStore);

  useEffect(() => {
    initHomePage();
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/img/header.png")}
        resizeMode="cover"
        style={{ height: 210 }}
      >
        <HeaderText />
      </ImageBackground>

      <View
        style={{
          // marginTop: 98,
          marginTop: 38,
          marginBottom: SIZES.large,
          paddingHorizontal: SIZES.small,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <FilterButton label={"Jour"} active={true} />
        <FilterButton
          label={"Mois"}
          onPress={() => navigation.navigate("MonthView")}
        />
      </View>

      <View style={styles.daySection}>
        <TouchableOpacity
          onPress={() => {
            /* Retire un jour de la date dans le store */
            setDay(moment(day).subtract(1, "days").format("YYYY-MM-DD"));
          }}
        >
          <FontAwesome
            name="chevron-left"
            size={24}
            color={TEXT_COLOR.SECONDARY}
          />
        </TouchableOpacity>
        <Text style={styles.day}>{moment(day).format("dddd LL")}</Text>
        <TouchableOpacity
          onPress={() => {
            /* Ajoute 1 jour dans la date du store */
            setDay(moment(day).add(1, "days").format("YYYY-MM-DD"));
          }}
        >
          <FontAwesome
            name="chevron-right"
            size={24}
            color={TEXT_COLOR.SECONDARY}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
        {/* {tasksList.map((item, index) => {
              if (moment(item.day).format("YYYY-MM-DD") == day) {
                console.log("yesssss");
                return <DayBoard task={item} key={`${item.day}_${index}`} />;
              }
            })} */}
          {tasksList
            .sort((a, b) => {
              if (a.time && b.time) {
                const timeA = moment(a.time, 'HH:mm:ss').toDate();
                const timeB = moment(b.time, 'HH:mm:ss').toDate();
                return timeA - timeB;
              }
            })
            .map((item, index) => {
              if (moment.utc(item.day).format("YYYY-MM-DD") == day) {
                return <DayBoard task={item} key={`${item.day}_${index}`} />;
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
  daySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.large,
    marginBottom: SIZES.large,
  },
  day: {
    fontFamily: FONTS.mukta.bold,
    fontSize: SIZES.base + 2,
    color: COLORS.TERTIARY,
    textTransform: "capitalize",
  },
});
