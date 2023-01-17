import { StyleSheet, View } from "react-native";
import React from "react";
import { SIZES } from "../../../theme";
import CardDay from "../../../component/CardDay";

export default function DayBoard({ task }) {
  return (
    <View style={styles.container}>
      <CardDay task={task} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.base,
  },
});
