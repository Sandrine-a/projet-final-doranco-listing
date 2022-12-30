import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CARDS, FONTS, RADIUS, SIZES } from '../../../../theme'

export default function FilterButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{ label }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: CARDS,
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