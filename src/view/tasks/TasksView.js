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
import { useStore } from "@nanostores/react";
import { Provider as PaperProvider } from 'react-native-paper';

import "intl";
import "intl/locale-data/jsonp/fr-FR";

import { TimePickerModal } from "react-native-paper-dates";

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
import Button from "../../component/Button.js";
import {
  addNewTask,
  calendarStore,
  setContent,
  setDate,
  setTaskColor,
  setTitle,
} from "../../../store/calendarStore";

export default function TasksView() {
  // const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");
  const [day, setDay] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("");
  const [activeColor, setActiveColor] = useState(null);
  // const [day, setDay] = useState("");
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [time, setTime] = useState()

  // Pour récupérer tout l'etat du calendard
  const { title, content, taskColor, date } = useStore(calendarStore);

  const showCalendar = () => {
    !visible ? setVisible(true) : setVisible(false);
  };

  const onTimeDismiss = React.useCallback(() => {
    setTimeModalVisible(false);
  }, [setTimeModalVisible]);

  const onTimeConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setTimeModalVisible(false);
      console.log({ hours, minutes });
      setTime({hours, minutes})
    },
    [setTimeModalVisible]
  );

  useEffect(() => {
    console.log("TaskView day is== ", day);
    // moment.locale("fr");

    // const words = today.toLocaleString("fr");

    // console.log(words);

    // setDay(words);

    // setDate(new Date())
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
              // onChangeText={onChangeTitle}
              onChangeText={setTitle}
              value={title}
              placeholder="Titre"
              contentStyle={{
                fontFamily: FONTS.londrinaSolid.regular,
                fontSize: SIZES.large,
                color: color ? color : TEXT_COLOR.PRIMARY,
                borderWidth: 0,
                paddingLeft: 0,
              }}
              // underlineColor="transparent"
              mode="outlined"
              outlineStyle={{ borderWidth: 0, backgroundColor: "white" }}
            />
          </View>

          <View>
            <TextInput
              onChangeText={setContent}
              value={content}
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
                <ColorPreview
                  color={el.value}
                  key={el.value}
                  onPressColor={() => {
                    setColor(el.value);
                    setActiveColor(el.color);

                    setTaskColor(el);
                  }}
                  active={el.color == activeColor ? true : false}
                />
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
              {
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
              }
              {/* {!visible ? (
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
              ) : null} */}
            </TouchableOpacity>

            {visible ? (
              <CalendarItem
                onDayPress={(day) => {
                  console.log(day);
                  setDay(day.dateString);
                }}
                day={day}
                setDay={setDay}
                coloredBackground={true}
                setVisible={setVisible}
              />
            ) : null}
          </View>

          <View style={styles.section}>
            <TouchableOpacity onPress={() => setTimeModalVisible(true)}>
              <Text>Heure : </Text>
              {time ? <Text>{ time.hours } : { time.minutes}</Text> : null}
            </TouchableOpacity>

            {timeModalVisible ? (
              <TimePickerModal
                visible={true}
                onDismiss={onTimeDismiss}
                onConfirm={onTimeConfirm}
                // hours={12}
                // minutes={14}
                // is24Hour={true}
                locale="fr-FR"
                label="Choisir une heure"
                cancelLabel="Annuler"
                animationType="fade"
              />
            ) : null}
          </View>

          <View style={[styles.section, { alignSelf: "flex-end" }]}>
            <Button
              label={"Enregistrer"}
              onPress={() => {
                console.log("test");
                addNewTask();
              }}
              containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
            />
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
    marginBottom: SIZES.small,
  },
  section: {
    marginBottom: SIZES.base,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
