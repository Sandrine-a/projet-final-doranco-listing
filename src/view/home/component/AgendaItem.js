import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Agenda, AgendaList, LocaleConfig, } from "react-native-calendars";
import { COLORS, FONTS, TEXT_COLOR } from "../../../../theme";
import CardDay from "../../../component/CardDay";

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

export default function AgendaItem() {
  return (
    <Agenda
      firstDay={1}
      
      style={{
        backgroundColor:"transparent",
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
      }}
      minDate={"2020-01-01"}
      items={{
        '2023-01-12': [{name: 'item 1 - any js object'}],
        // '2023-01-14': [{name: 'item 2 - any js object', height: 80}],
        // '2023-01-14': [{name: 'item 2 - any js object', height: 80}],
        // '2023-01-20': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
      }}

      // renderItem={(item, firstItemInDay) => {
      //   return <CardDay />;
      // }}
      
    />
  );
}

const styles = StyleSheet.create({});
