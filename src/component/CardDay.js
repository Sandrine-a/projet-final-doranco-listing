import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { boxShadow, CARDS, FONTS, RADIUS, SIZES } from "../../theme";
import DotItem from "./DotItem";

export default function CardDay({ task }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: 2,
          borderRadius: RADIUS.rectangle,
          borderColor: CARDS,
          paddingHorizontal: SIZES.small,
          paddingVertical: SIZES.xs,
          backgroundColor: "white",
          marginBottom: SIZES.base,
        },
        boxShadow,
      ]}
      onPress={() => {
        console.log("taskId =", task.taskId);
        navigation.navigate("TasksView", { task: task });
      }}
    >
      <View style={styles.dotContainer}>
        <DotItem size={"s"} />
        <DotItem size={"s"} />
      </View>

      {/* Titre */}
      <Text
        style={[styles.title, { color: task.taskColor.value }]}
        numberOfLines={1}
      >
        {" "}
        {task.title}{" "}
      </Text>

      {/* Corps */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SIZES.xs }}>
        <Text
          style={{ fontFamily: FONTS.mukta.regular, width: "80%" }}
          numberOfLines={2}
        >
          {task.content}
        </Text>

        {task.time ? (
          <View
            style={{
              fontFamily: FONTS.mukta.regular,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            {/* {task.time.hours} : {task.time.minutes} */}

            {task.time.hours >= 0 && task.time.hours < 10 ? (
              <Text style={styles.text}>0{task.time.hours}</Text>
            ) : (
              <Text style={styles.text}>{task.time.hours}</Text>
            )}
            {task.time.minutes >= 0 && task.time.minutes < 10 ? (
              <Text style={styles.text}> : 0{task.time.minutes}</Text>
            ) : (
              <Text style={styles.text}> : {task.time.minutes}</Text>
            )}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FONTS.londrinaSolid.regular,
    textTransform: "uppercase",
    fontSize: SIZES.base + 1,
  },
});
