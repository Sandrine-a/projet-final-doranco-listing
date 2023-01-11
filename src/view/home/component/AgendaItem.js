import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Agenda, AgendaList, LocaleConfig } from "react-native-calendars";
import { COLORS, FONTS, PINK, TEXT_COLOR } from "../../../../theme";
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

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export default function AgendaItem() {
  const [toggle, setToggle] = useState(true);

  const [items, setItems] = useState({}
    // "2023-01-12": [
    //   { name: "item 1 - any js object" },
    //   { name: "Walking" },
    //   { name: "Running" },
    //   { name: "Running" },
    //   { name: "Running" },
    // ],
    // "2023-01-13": [{ name: "Subject 2" }, { name: "Running" }],
  );

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 5; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems)
    }, 1000);
  };

  return (
    <Agenda
      firstDay={1}
      // Agenda container style
      style={
        {
          // backgroundColor: "red",
          // height: 300,
        }
      }
      // horizontal={true}
      // Specify theme properties to override specific styles for calendar parts.
      theme={{
        // calendarBackground: "transparent",
        // // calendarBackground: COLORS.PRIMARY,
        // textSectionTitleColor: TEXT_COLOR.PRIMARY, //dayText color
        // selectedDayBackgroundColor: COLORS.TERTIARY,
        // selectedDayTextColor: "white",

        todayTextColor: COLORS.TERTIARY,

        textMonthFontFamily: FONTS.oswald.bold,
        textDayHeaderFontFamily: FONTS.oswald.regular,
        // dotColor: "red",
        // weekVerticalMargin: 2,

        "stylesheet.calendar.header": {
          dayTextAtIndex5: {
            color: COLORS.SECONDARY_DARK,
          },
          dayTextAtIndex6: {
            color: COLORS.SECONDARY_DARK,
          },
        },
      }}
      // onDayPress={(day) => {}}
      minDate={"2020-01-01"}
      items={items}
      // Callback that fires when the calendar is opened or closed
      // onCalendarToggled={(calendarOpened) => {
      //   console.log(calendarOpened);
      // }}

      // Specify what should be rendered instead of ActivityIndicator
      // renderEmptyData={() => {
      //   return <View style={{ height: 10, backgroundColor: "pink" }}></View>;
      // }}

      // Override inner list with a custom implemented component
      // renderList={(listProps) => {
      //   return <View style={{ flex: 1, backgroundColor: "green" }} />;
      // }}

      renderItem={(item, firstItemInDay) => {
        console.log(item);
        return (
          <View style={{ flex: 1 }}>
            <CardDay
              title={item.name}
              content={"xefefefefe"}
              date={null}
              time={null}
              color={PINK}
            />
          </View>
        );
      }}
      // Callback that gets called when items for a certain month should be loaded (month became visible)
      loadItemsForMonth={loadItems}
    />
  );
}

const styles = StyleSheet.create({});
