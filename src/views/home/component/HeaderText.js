import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, SIZES, TEXT_COLOR } from "../../../theme";
import { useStore } from "@nanostores/react";
import { calendarStore } from "../../../store/calendarStore";
import { authenticationStore } from "../../../store/authenticationStore";

export default function HeaderText({ label }) {
  // const { username } = useStore(calendarStore);
  const { user } = useStore(authenticationStore);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    fontFamily: FONTS.oswald.bold,
    fontSize: SIZES.large * 1.4,
    color: TEXT_COLOR.PRIMARY,
  },
});
