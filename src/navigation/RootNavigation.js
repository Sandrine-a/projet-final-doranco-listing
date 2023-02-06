import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";

import MonthView from "../views/home/MonthView";
import DayView from "../views/home/DayView";
import TasksView from "../views/tasks/TasksView";
import { FONTS } from "../theme";
import AuthView from "../views/authentication/AuthView";
import { useStore } from "@nanostores/react";
import {
  authenticationStore,
  autoConnect,
  setUrlData,
} from "../store/authenticationStore";
import UserProfil from "../views/profil/UserProfil";
import ForgotPasswordView from "../views/authentication/ForgotPasswordView";

export default function RootNavigation() {
  // const RootStack = createNativeStackNavigator();
  const RootStack = createStackNavigator();
  const { user, urlData } = useStore(authenticationStore);

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);

    // console.log("data ==", data);
    setUrlData(data);
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      // console.log("initialUrl == ", initialUrl);
      if (initialUrl) setUrlData(Linking.parse(initialUrl));
    };

    const urlListener = Linking.addEventListener("url", handleDeepLink);
    // console.log(" urlListener == ",  urlListener);
    if (!urlData) {
      getInitialURL();
    }

    return () => {
      urlListener.remove();
    };
  }, []);

  useEffect(() => {
    autoConnect();
  }, []);

  return (
    <RootStack.Navigator>
      {user == null ? (
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen
            name="AuthView"
            component={AuthView}
            options={{ animation: "fade" }}
          />
          <RootStack.Screen
            name="ForgotPasswordView"
            component={ForgotPasswordView}
            options={{ presentation: "transparentModal", animation: "fade" }}
          />
          <RootStack.Screen
            name="Reset"
            component={ForgotPasswordView}
            options={{ presentation: "transparentModal", animation: "fade" }}
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
          <RootStack.Group>
            <RootStack.Screen
              name="UserProfil"
              component={UserProfil}
              options={{ headerShown: false, animation: "fade" }}
            />
          </RootStack.Group>
        </>
      )}
    </RootStack.Navigator>
  );
}
