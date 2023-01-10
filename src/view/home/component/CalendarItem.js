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

export default function CalendarItem({ onDayPress, setDay, coloredBackground, setVisible }) {

  const [selectedDay, setSelectedDay] = useState({});

  const today = new Date();

  // const getSelectDay  = async (day) => {}

  useEffect(() => {
    // console.log("The day", selectedDay);
    return () => {};
  }, [selectedDay]);

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
        dotColor: "red",
        weekVerticalMargin: 2,
        
        "stylesheet.calendar.header": {
          dayTextAtIndex5: {
            color: COLORS.SECONDARY_DARK,
          },
          dayTextAtIndex6: {
            color: COLORS.SECONDARY_DARK,
          },
        },
      }}
      onDayPress={(day) => {
        let markedDay = {}
        markedDay[day.dateString] = {/* marked: true, */ selected: true, customStyles: {
          container: {
            borderRadius: 7,
          },
          // text: {
          //   color: 'black',
          //   fontWeight: 'bold'
          // }
        }}
        setSelectedDay(markedDay)
        setDay(day.dateString)
      

        // onDayPress(day);
        // setVisible(false)
      }}
      minDate={"2020-01-01"}

      markingType={'custom'}
      markedDates={
        selectedDay
        
        // '2023-01-31': {marked: true, selected: true},
      }


      // dayComponent={({date, state}) => {
        // console.log("DATE === ", date);
        // console.log("STATE ===", state);
      //   return (
      //     <View>
      //       <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : "red"}}>{date.day}</Text>
      //     </View>
      //   );
      // }}
    />
  );
}

const styles = StyleSheet.create({});
