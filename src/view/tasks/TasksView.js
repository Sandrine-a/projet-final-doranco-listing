import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

import BottomTab from "../../component/BottomTab";
import DotItem from "../../component/DotItem";
import {
  boxShadow,
  cardContainer,
  CARDS,
  CARD_THEME,
  dotContainer,
  FONTS,
  GREEN,
  RADIUS,
  SIZES,
  TEXT_COLOR,
} from "../../../theme";
import ColorPreview from "./component/ColorPreview";

export default function TasksView() {
  const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: SIZES.base }}>
        <View style={[cardContainer, boxShadow]}>
          <View style={dotContainer}>
            <DotItem size={"m"} />
            <DotItem size={"m"} />
          </View>

          <View>
            <TextInput
              onChangeText={onChangeTitle}
              value={title}
              placeholder="Titre"
              contentStyle={{
                fontFamily: FONTS.londrinaSolid.regular,
                color: TEXT_COLOR.PRIMARY,
                borderWidth: 0,
              }}
              // underlineColor="transparent"
              mode="outlined"
              outlineStyle={{ borderWidth: 0, backgroundColor: "white" }}
            />
          </View>

          <View>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              multiline={true}
              placeholder="Ajouter une tâche"
              contentStyle={{
                fontFamily: FONTS.mukta.regular,
                color: TEXT_COLOR.PRIMARY,
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
              //   underlineColor="transparent"
              mode="outlined"
              outlineStyle={{ borderWidth: 0, backgroundColor: "white" }}
            />
          </View>

          <View style={styles.section}
          >
            <Text style={styles.label}>Couleur:</Text>
            <View style={styles.colorRow}>
              {CARD_THEME.map((el) => (
                <ColorPreview color={el.value} key={el.value} />
              ))}
            </View>
          </View>

          <View style={styles.section}
          >
            
          </View>
        </View>
      </ScrollView>

      <BottomTab onlyCloseButton={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: SIZES.base,
  },
  input: {
    fontStyle: FONTS.londrinaSolid.black,
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  label: {
    fontFamily: FONTS.oswald.bold,
    color: TEXT_COLOR.PRIMARY,
    fontSize: SIZES.base,
    // marginBottom: SIZES.small
  },
  section: {
    marginBottom: SIZES.base,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
