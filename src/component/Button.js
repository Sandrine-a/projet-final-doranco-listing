import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { boxShadow, FONTS, RADIUS, SIZES } from "../theme";

export default function Button({ label, onPress, containerStyle = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, boxShadow, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.rectangle,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.small
  },
  label: {
    fontFamily: FONTS.oswald.semiBold,
    fontSize: SIZES.base
  },
});
