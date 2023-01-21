import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MonthView from "../views/home/MonthViewCalendar";
import DayView from "../views/home/DayView";
import TasksView from "../views/tasks/TasksView";
import { FONTS } from "../theme";
import AuthView from "../views/authentication/AuthView";
import { useStore } from "@nanostores/react";
import { authenticationStore, autoConnect, isLoggedIn } from "../store/authenticationStore";

export default function RootNavigation() {
  const RootStack = createNativeStackNavigator();
  const { user } = useStore(authenticationStore);

  useEffect(() => {
    // console.log("useEffect user is:", user);
    // isLoggedIn()
    autoConnect()

  }, [])
  return (
    <RootStack.Navigator>
      {user == null ? (
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen
            name="AuthView"
            component={AuthView}
            options={{ animation: "fade" }}
          />
        </RootStack.Group>
      ) : (
        <>
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
              options={({ route }) => ({
                // title: "Créer un rdv",
                title: route.params.title,
                headerTitleStyle: {
                  fontFamily: FONTS.oswald.bold,
                },
                headerShadowVisible: false,
                animation: "slide_from_bottom",
                headerBackTitleVisible: false,
              })}
            />
          </RootStack.Group>
        </>
      )}
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});
