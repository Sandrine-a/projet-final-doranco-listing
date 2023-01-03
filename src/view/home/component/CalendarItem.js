import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { FONTS, TEXT_COLOR, COLORS } from "../../../../theme";

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

export default function CalendarItem({ onDayPress }) {
  return (
    <Calendar
      firstDay={1}
      // showWeekNumbers={true}
      style={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "gray",
        // height: 300,
      }}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        textSectionTitleColor: TEXT_COLOR.PRIMARY,
        arrowColor: COLORS.TERTIARY,
        textMonthFontFamily: FONTS.oswald.regular,
        textDayHeaderFontFamily: FONTS.oswald.regular,
        dotColor: "#00adf5",
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

      onDayPress={day => {
        // console.log('selected day', day);
        onDayPress(day)
      }}

      // dayComponent={({date, state}) => {
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
