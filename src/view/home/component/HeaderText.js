import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS, SIZES, TEXT_COLOR } from '../../../../theme'

export default function HeaderText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Sandrine</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  text: {
    fontFamily: FONTS.oswald.bold,
    fontSize: SIZES.large * 1.4,
    color: TEXT_COLOR.PRIMARY
  }
})