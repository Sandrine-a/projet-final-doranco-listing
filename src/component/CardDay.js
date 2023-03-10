import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  boxShadow,
  CARDS,
  CARD_THEME,
  COLORS,
  FONTS,
  RADIUS,
  SIZES,
  TEXT_COLOR,
} from "../theme";
import DotItem from "./DotItem";

export default function CardDay({ task }) {
  const navigation = useNavigation();

  const taskColorTheme = (color) => {
    let colorValue;
    switch (color) {
      case "GREEN":
        return (colorValue = "#94C973");
      case "PINK":
        return (colorValue = "#BA4F6A");
      case "BLUE":
        return (colorValue = "#629DA3");
      case "NUDE":
        return (colorValue = "#C98345");
      case "BROWN":
        return (colorValue = "#8B440E");
      case "YELLOW":
        return (colorValue = "#D5AF10");
      case "RED":
        return (colorValue = "#BC3110");
      case "PURPLE":
        return (colorValue = "#603F8B");
      default:
        return (colorValue = TEXT_COLOR.PRIMARY);
    }
  };

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
        navigation.navigate("TasksView", {
          task: task,
          title: "Modifier une tâche",
        });
      }}
    >
      <View style={styles.dotContainer}>
        <DotItem size={"s"} />
        <DotItem size={"s"} />
      </View>

      {/* Titre */}
      <Text
        style={[
          styles.title,
          {
            color: taskColorTheme(task.taskColor),
          },
        ]}
        numberOfLines={1}
      >
        {" "}
        {task.title}{" "}
      </Text>

      {/* Corps */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.xs,
        }}
      >
        <Text
          style={styles.text}
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
            {
              <Text style={styles.text}>
                {moment(task.time, "HH:mm:ss").format("HH:mm")}
              </Text>
            }
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
    paddingHorizontal: SIZES.xs
  },
  text: {
    fontFamily: FONTS.mukta.regular,
    paddingHorizontal: SIZES.xs
  }
});
