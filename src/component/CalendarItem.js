import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { FONTS, TEXT_COLOR, COLORS } from "../theme";
import moment from "moment";
import { useStore } from "@nanostores/react";
import { calendarStore, setMonth } from "../store/calendarStore";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

export default function CalendarItem({
  onDayPress,
  setDay,
  coloredBackground,
  setVisible,
  withDot,
  // month,
  // setMonth
}) {
  const [selectedDay, setSelectedDay] = useState({});

  const { tasksList, day, month } = useStore(calendarStore);

  const today = new Date();

  useEffect(() => {
    /*  Si on met les dot on ne peu pas selectionner un jour */
    if (withDot) {
      let markedDay = {};
      tasksList.map((item) => {
        markedDay[moment.utc(item.day).format("YYYY-MM-DD")] = {
          marked: true,
        };
      });
      setSelectedDay(markedDay);
    } else {
      setSelectedDay({
        [day]: {
          selected: true,
          customStyles: {
            container: {
              borderRadius: 7,
            },
          },
        },
      });
    }

    return () => {};
  }, [
    tasksList,
  ]);

  /* Marquage dynamique si selection */
  const onDaySelect = (day) => {
    let markedDay = {};
    markedDay[day.dateString] = {
      /* marked: true, */
      selected: true,
      customStyles: {
        container: {
          borderRadius: 7,
        },
      },
    };
    setSelectedDay(markedDay);
  };



  return (
    <Calendar
      firstDay={1}
      // Specify style for calendar container element.
      style={{
        backgroundColor: coloredBackground ? COLORS.PRIMARY : "transparent",
      }}
      // Specify theme properties to override specific styles for calendar parts.
      theme={{
        calendarBackground: "transparent",
        textSectionTitleColor: TEXT_COLOR.PRIMARY, //dayText color

        selectedDayBackgroundColor: COLORS.TERTIARY,
        selectedDayTextColor: "white",

        todayTextColor: COLORS.TERTIARY,

        arrowColor: TEXT_COLOR.PRIMARY,
        textMonthFontFamily: FONTS.oswald.bold,
        textDayHeaderFontFamily: FONTS.oswald.regular,
        dotColor: COLORS.SECONDARY,
        dotStyle: { width: 5, height: 5 },

        "stylesheet.day.basic": {
          base: {
            width: 27,
            height: 27,
            // marginBottom: 3,
            color: TEXT_COLOR.PRIMARY,
            // backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center",
          },
        },

        "stylesheet.calendar.main": {
          week: {
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 4,
            flexDirection: "row",
            justifyContent: "space-around",
          },
        },

        "stylesheet.calendar.header": {
          header: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: "center",
          },
          headerContainer: {
            flexDirection: "row",
          },
          arrow: {
            padding: 10,
            marginBottom: 0,
          },
          monthText: {
            fontFamily: FONTS.oswald.bold,
            fontSize: 16,
          },
          dayTextAtIndex5: {
            color: COLORS.SECONDARY_DARK,
          },
          dayTextAtIndex6: {
            color: COLORS.SECONDARY_DARK,
          },
          dayHeader: {
            marginTop: 0,
            marginBottom: 2,
          },
        },
      }}
      onDayPress={(day) => {
        if (!withDot) {
          onDaySelect(day);
        }
        setDay(day.dateString);
      }}
      minDate={"2020-01-01"}
      markingType={"custom"}
      markedDates={
        selectedDay
      }
      onMonthChange={(date) => {

        setMonth(moment(date.dateString).format("MM"));
      }}
    />
  );
}

const styles = StyleSheet.create({});
