import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MonthView from "../view/home/MonthViewCalendar";
import DayView from "../view/home/DayView";
import TasksView from "../view/tasks/TasksView";
import { FONTS } from "../theme";

export default function RootNavigation() {
  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name="DayView"
          component={DayView}
          options={{ animation: "fade" }}
        />
        <RootStack.Screen
          name="MonthView"
          component={MonthView}
          options={{ animation: "fade" }}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name="TasksView"
          component={TasksView}
          options={({ route }) =>({
            // title: "Créer un rdv",
            title: route.params.title,
            headerTitleStyle: {
              fontFamily: FONTS.oswald.bold
            },
            headerShadowVisible: false,
            animation: "slide_from_bottom",
            headerBackTitleVisible: false
          })}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
