import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CARDS, FONTS, RADIUS, SIZES } from "../../theme";
import DotItem from "./DotItem";

export default function CardDay({title, color}) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: RADIUS.rectangle,
        borderColor: CARDS,
        padding: SIZES.small,
      }}
    >
      <View style={styles.dotContainer}>
        <DotItem size={"s"} />
        <DotItem size={"s"} />
      </View>

      {/* Titire */}
      <Text style={[styles.title, {color: color}]}> { title } </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FONTS.londrinaSolid.regular,
    textTransform:"uppercase",
    fontSize: SIZES.large,
  }
});
