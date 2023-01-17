import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';
import { CARDS, SIZES } from '../theme';

export default function DotItem({size}) {
  return (
    <Octicons name="dot-fill" size={size === "s" ? SIZES.small : SIZES.base} color={CARDS} />
  )
}

const styles = StyleSheet.create({})