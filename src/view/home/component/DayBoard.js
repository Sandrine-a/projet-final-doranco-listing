import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BLUE, CARDS, PINK, RADIUS, SIZES } from "../../../../theme";
import CardDay from "../../../component/CardDay"

export default function DayBoard() {
  return (
    <View style={styles.container}>

      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      <CardDay title={"To do"} color={PINK} />
      
      {/* <View
        style={{
          borderWidth: 2,
          borderRadius: RADIUS.rectangle,
          borderColor: CARDS,
          padding: SIZES.small
        }}
      >
        <View style={styles.dotContainer}>
          <DotItem size={"s"} />
          <DotItem size={"s"} />


        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.base
  }
});
