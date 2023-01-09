import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { boxShadow, CARDS, FONTS, RADIUS, SIZES } from "../../theme";
import DotItem from "./DotItem";

export default function CardDay({title, content, color}) {
  return (
    <View
      style={[{
        borderWidth: 2,
        borderRadius: RADIUS.rectangle,
        borderColor: CARDS,
        padding: SIZES.small,
        backgroundColor: "white",
        marginBottom: SIZES.base

      }, boxShadow]}
    >
      <View style={styles.dotContainer}>
        <DotItem size={"s"} />
        <DotItem size={"s"} />
      </View>

      {/* Titre */}
      <Text style={[styles.title, {color: color}]}> { title } </Text>

      <View>
        <Text style={{ fontFamily: FONTS.mukta.regular}}>{ content }</Text>
      </View>
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
