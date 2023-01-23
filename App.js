import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation.js";

import {
  useFonts as useOswald,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useMukta,
  Mukta_400Regular,
  Mukta_500Medium,
  Mukta_600SemiBold,
  Mukta_700Bold,
  Mukta_800ExtraBold,
} from "@expo-google-fonts/mukta";

import {
  useFonts as useLondrinaSolid,
  LondrinaSolid_100Thin,
  LondrinaSolid_300Light,
  LondrinaSolid_400Regular,
  LondrinaSolid_900Black,
} from "@expo-google-fonts/londrina-solid";

import { CARDS, COLORS, PRIMARY_COLOR_DARK, TEXT_COLOR } from "./src/theme.js";


const BaseTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR_DARK,
    background: "white",
    card: "white",
    text: TEXT_COLOR.PRIMARY,
    border: CARDS,
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  //Je charge la police Lobser
  const [isOswaldReady] = useOswald({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  const [isMuktaReady] = useMukta({
    Mukta_400Regular,
    Mukta_500Medium,
    Mukta_600SemiBold,
    Mukta_700Bold,
    Mukta_800ExtraBold,
  });

  const [isLondrinaSolidReady] = useLondrinaSolid({
    LondrinaSolid_400Regular,
    LondrinaSolid_900Black,
  });

  if (!isOswaldReady || !isMuktaReady || !isLondrinaSolidReady) {
    return;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={BaseTheme}>
        <RootNavigation />
        <StatusBar backgroundColor={COLORS.PRIMARY_DARK} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
