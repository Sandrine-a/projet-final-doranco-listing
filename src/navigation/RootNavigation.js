import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../view/home/HomeScreen";
import MonthView from "../view/home/MonthView";
import DayView from "../view/home/DayView";

export default function RootNavigation() {
  const RootStack = createNativeStackNavigator();

  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

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
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
