import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

import moment from "moment";
import "moment/locale/fr";
// import "moment/min/locales";
import { Ionicons } from "@expo/vector-icons";

import BottomTab from "../../component/BottomTab";
import DotItem from "../../component/DotItem";
import {
  boxShadow,
  cardContainer,
  CARDS,
  CARD_THEME,
  COLORS,
  dotContainer,
  FONTS,
  GREEN,
  RADIUS,
  SIZES,
  TEXT_COLOR,
} from "../../../theme";
import ColorPreview from "./component/ColorPreview";
import CalendarItem from "../home/component/CalendarItem";

export default function TasksView() {
  const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");
  const [day, setDay] = useState(new Date());
  const [visible, setVisible] = useState(false);
  // const [day, setDay] = useState("");

  const showCalendar = () => {
    !visible ? setVisible(true) : setVisible(false);
  };

  useEffect(() => {
    console.log("TaskView day is== ", day);
    // moment.locale("fr");

    // const words = today.toLocaleString("fr");

    // console.log(words);

    // setDay(words);

    // let newDay = today.split('T')[0]

    // console.log(today.split('T')[0]);
    return () => {};
  }, [day, visible]);

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
                paddingLeft: 0
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

          <View style={styles.section}>
            <Text style={styles.label}>Couleur:</Text>
            <View style={styles.colorRow}>
              {CARD_THEME.map((el) => (
                <ColorPreview color={el.value} key={el.value} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              onPress={showCalendar}
              style={{ flexDirection: "row" }}
            >
              {/* <Text>{day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}</Text> */}

              {/* <Text>{moment(day).format("DD MMMM HH:mm")}</Text> */}

              <Ionicons
                name="calendar"
                size={24}
                style={{
                  color: visible ? COLORS.PRIMARY_DARK : COLORS.SECONDARY_DARK,
                }}
              />
              {!visible ? (
                <Text
                  style={{
                    fontFamily: FONTS.mukta.bold,
                    color: visible
                      ? COLORS.PRIMARY_DARK
                      : COLORS.SECONDARY_DARK,
                    fontSize: SIZES.base,
                  }}
                >
                  {moment(day).format("LL")}
                </Text>
              ) : null}
            </TouchableOpacity>

            {visible ? (
              <CalendarItem
                onDayPress={(day) => {
                  console.log(day.dateString);
                  setDay(day.dateString)
                }}
                day={day}
                coloredBackground={true}
                setVisible={setVisible}
              />
            ) : null}
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
    marginBottom: SIZES.small
  },
  section: {
    marginBottom: SIZES.base,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
