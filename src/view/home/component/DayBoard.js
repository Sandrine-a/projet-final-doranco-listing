import { StyleSheet, View } from "react-native";
import React from "react";
import { SIZES } from "../../../../theme";
import CardDay from "../../../component/CardDay";

export default function DayBoard({ item }) {
  return (
    <View style={styles.container}>
      <CardDay
        color={item.taskColor?.value}
        title={item.title}
        content={item.content}
        day={item.day}
        time={item.time}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.base,
  },
});
