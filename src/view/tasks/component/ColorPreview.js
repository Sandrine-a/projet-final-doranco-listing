import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RADIUS } from "../../../../theme";

export default function ColorPreview({ color }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
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
