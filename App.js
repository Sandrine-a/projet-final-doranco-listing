import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
import { PRIMARY_COLOR, PRIMARY_COLOR_DARK, PRIMARY_TEXT_COLOR, SECONDARY_TEXT_COLOR } from "./theme.js";

const BaseTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR_DARK,
    background: "white",
    card: 'rgb(255, 255, 255)',
    text: PRIMARY_TEXT_COLOR,
    border: SECONDARY_TEXT_COLOR,
    notification: 'rgb(255, 69, 58)',
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

  if (!isOswaldReady || !isMuktaReady) {
    return;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={BaseTheme}>
        <RootNavigation />
        <StatusBar style="auto" backgroundColor={PRIMARY_COLOR_DARK} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
