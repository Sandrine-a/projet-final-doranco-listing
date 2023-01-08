import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { CARDS, RADIUS, TEXT_COLOR } from "../../../../theme";

export default function ColorPreview({ color, onPressColor, active }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: color },
        active ? { borderWidth: 3, borderColor: TEXT_COLOR.PRIMARY } : null,
      ]}
      onPress={onPressColor}
    ></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.rond,
    height: 24,
    width: 24,
  },
});
