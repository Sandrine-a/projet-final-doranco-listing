import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BLUE, CARDS, PINK, RADIUS, SIZES } from "../../../../theme";
import CardDay from "../../../component/CardDay"
import { useStore } from "@nanostores/react";
import { calendarStore } from "../../../../store/calendarStore";

export default function DayBoard() {
  const { tasksList } = useStore(calendarStore)

  console.log(tasksList);
  return (
    <View style={styles.container}>
      {tasksList.map((item, index) => {
        return <CardDay color={item.taskColor?.value} title={item.title} content={item.content} key={`${item.title}_${index}`} />
      })}
      {/* <CardDay title={"To do"} color={PINK} />
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
      <CardDay title={"To do"} color={PINK} /> */}
      
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
