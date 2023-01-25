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

import {
  calendarStore,
  initHomePage,
  setDay,
  setNoTask,
} from "../../store/calendarStore";
import Loader from "../../component/Loader";
import {
  setActive,
  setOnlyCloseButton,
  setViewActive,
} from "../../store/bottomTabNavStore";
import { authenticationStore } from "../../store/authenticationStore";

export default function DayView({ navigation }) {
  const { tasksList, day, loading, noTask, currentDay } =
    useStore(calendarStore);
  const { user } = useStore(authenticationStore);

  useEffect(() => {
    initHomePage();
    setOnlyCloseButton(false);
    setViewActive({ name: "dayView", active: true });
    return () => {
      setViewActive({ name: "dayView", active: false });
    };
  }, []);

  const NoTask = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.base,
          marginTop: SIZES.large * 2,
          alignItems: "center",
        }}
      >
        <Text style={styles.noTaskText}>
          Pas encore de note pour aujourd'hui.
        </Text>
        <Text style={styles.noTaskText}>Appuyez sur + pour en créer.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/img/header.png")}
        resizeMode="cover"
        style={{ height: 210 }}
      >
        <HeaderText label={`Hello ${user.username}`} />
      </ImageBackground>

      <View
        style={{
          marginTop: 45,
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
        {!loading ? (
          <View style={styles.cardsContainer}>
            {/* {tasksList.map((item, index) => {
              if (moment(item.day).format("YYYY-MM-DD") == day) {
                console.log("yesssss");
                return <DayBoard task={item} key={`${item.day}_${index}`} />;
              }
            })} */}

            {tasksList
              .sort((a, b) => {
                // console.log(a.time);
                // console.log(b.time);
                if (a.time && b.time) {
                  const timeA = moment(a.time, "HH:mm:ss").toDate();
                  const timeB = moment(b.time, "HH:mm:ss").toDate();
                  // console.log(timeA);
                  // console.log(timeB);
                  return timeA - timeB;
                }
              })
              .map((item, index) => {
                if (moment.utc(item.day).format("YYYY-MM-DD") == day) {
                  setNoTask(false);
                  return <DayBoard task={item} key={`${item.day}_${index}`} />;
                }
              })}
          </View>
        ) : (
          <Loader />
        )}
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
  noTaskText: {
    fontFamily: FONTS.oswald.regular,
    fontSize: SIZES.large,
    paddingTop: SIZES.base,
    color: TEXT_COLOR.PRIMARY,
    textShadowOffset: { height: 2, width: 3 },
    textShadowColor: COLORS.PRIMARY,
    textShadowRadius: 4,
  },
});
