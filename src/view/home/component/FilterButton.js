import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { boxShadow, CARDS, COLORS, FONTS, RADIUS, SIZES } from '../../../../theme'

export default function FilterButton({ label, onPress, active = false }) {
  return (
    <TouchableOpacity style={[styles.container, {  backgroundColor: active ? COLORS.TERTIARY : CARDS }, active ? boxShadow : null ]} onPress={onPress}>
      <Text style={styles.label}>{ label }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: RADIUS.rectangle,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.large
  },
  label: {
    fontFamily: FONTS.oswald.regular,
    fontSize: SIZES.large
  }
})