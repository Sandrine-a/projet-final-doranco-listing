import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { FONTS, TEXT_COLOR, COLORS } from "../../../../theme";
import moment from "moment";
import { useStore } from "@nanostores/react";
import { calendarStore, setMonth } from "../../../../store/calendarStore";

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

  // const [month, setMonth] = useState()

  const { tasksList, day, month } = useStore(calendarStore);

  const today = new Date();

  // const getSelectDay  = async (day) => {}

  useEffect(() => {
    // console.log("The day", selectedDay);

    /*  Si on met les dot on ne peu pas selectionner un jour */
    if (withDot) {
      let markedDay = {};
      tasksList.map((item) => {
        markedDay[item.day] = {
          // selected: true,
          // selectedColor: "black",

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
    // month,
    /* selectedDay */
  ]);

  // let markedDay = {};
  // tasksList.map((item) => {
  //   markedDay[item.day] = {
  //     // selected: true,
  //     // selectedColor: "black",

  //     marked: true,
  //   };
  // });

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

  // let markedDay = tasksList.reduce(function (acc, obj) {
  //   let key = obj.day;
  //   if (!acc[key]) {
  //     acc[key] = [];
  //   }
  //   acc[key].push(obj);
  //   return acc;
  // }, {});
  // console.log(markedDay);

  // tasksList.map((el) => {
  //   console.log(el.taskColor.value);
  //   markedDay[el.day] = {
  //     dots: [
  //       {
  //         // key: "x",
  //         // selectedColor: el.taskColor ? el.taskColor.value : TEXT_COLOR.PRIMARY,
  //         color: el.taskColor.value ? el.taskColor.value : TEXT_COLOR.PRIMARY,
  //       },
  //       {
  //         // key: "x",
  //         // selectedColor: el.taskColor ? el.taskColor.value : TEXT_COLOR.PRIMARY,
  //         color: el.taskColor.value ? el.taskColor.value : TEXT_COLOR.PRIMARY,
  //       },
  //       {
  //         // key: "x",
  //         // selectedColor: el.taskColor ? el.taskColor.value : TEXT_COLOR.PRIMARY,
  //         color: el.taskColor.value ? el.taskColor.value : TEXT_COLOR.PRIMARY,
  //       }
  //     ],
  //     marked: true,
  //   };
  // });

  return (
    <Calendar
      firstDay={1}
      // showWeekNumbers={true}
      // Specify style for calendar container element.
      style={{
        backgroundColor: coloredBackground ? COLORS.PRIMARY : "transparent",
        // height: 300,
      }}
      // Specify theme properties to override specific styles for calendar parts.
      theme={{
        // backgroundColor: "transparent",
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
            // backgroundColor: "red",
            // alignItems: "center",
            // justifyContent: "center",

            // flexDirection: 'column',
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
        // let markedDay = {};
        // markedDay[day.dateString] = {
        //   /* marked: true, */
        //   selected: true,
        //   customStyles: {
        //     container: {
        //       borderRadius: 7,
        //     },
        //   },
        // };
        // setSelectedDay(markedDay);
        setDay(day.dateString);
      }}
      minDate={"2020-01-01"}
      markingType={"custom"}
      // markingType={"multi-dot"}
      markedDates={
        selectedDay
        // markedDay

        // {
        //   "2023-01-23": { marked: true },
        //   "2023-01-31": { marked: true },
        //   "2023-02-01": { marked: true },
        // }
      }
      onMonthChange={(date) => {
        // console.log("onMonthChange", date);
        // console.log(moment(date.dateString).format("MM"));

        setMonth(moment(date.dateString).format("MM"));
        // setMonth(moment(date.dateString).format("MM"))
        // console.log(moment(date.dateString).month());
        // console.log(moment(date.timestamp).month(1).format("YYYY-MM-DD"));
        // console.log("Avoir le mois correct + 1", moment(date.timestamp).month() + 1);
      }}
    />
  );
}

const styles = StyleSheet.create({});
