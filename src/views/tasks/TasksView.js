import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import "intl";
import "intl/locale-data/jsonp/fr-FR";
import { TimePickerModal } from "react-native-paper-dates";
import { useForm, useController, Controller } from "react-hook-form";

import moment from "moment";
import "moment/locale/fr";

import { Ionicons } from "@expo/vector-icons";

import BottomTab from "../../component/BottomTab";
import DotItem from "../../component/DotItem";
import {
  boxShadow,
  cardContainer,
  CARD_THEME,
  COLORS,
  dotContainer,
  FONTS,
  SIZES,
  TEXT_COLOR,
} from "../../theme";
import ColorPreview from "./component/ColorPreview";
import CalendarItem from "../home/component/CalendarItem";
import Button from "../../component/Button.js";
import {
  addNewTask,
  calendarStore,
  deleteTask,
  resetValues,
  setContent,
  setDay,
  setTaskColor,
  setTaskId,
  setTime,
  setTitle,
  updateTask,
} from "../../store/calendarStore";

export default function TasksView({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  // Pour changer dynamiquement le titre selon la route
  const [value, onChangeText] = useState(route.params.title);

  // Pour récupérer tout l'etat du calendard
  const { title, content, day, time, taskColor, taskId, error, canBack } =
    useStore(calendarStore);

  const showCalendar = () => {
    !visible ? setVisible(true) : setVisible(false);
  };

  const onTimeDismiss = React.useCallback(() => {
    setTimeModalVisible(false);
  }, [setTimeModalVisible]);

  const onTimeConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setTimeModalVisible(false);
      setTime(`${hours}:${minutes}`);
    },
    [setTimeModalVisible]
  );

  useEffect(() => {
    navigation.setOptions({
      title: value === "" ? "Créer un rdv" : value,
    });
  }, [navigation, value]);

  useEffect(() => {
    if (route?.params?.task) {
      setTaskId(route?.params.task.id);
      setTitle(route?.params.task.title);
      setContent(route?.params.task.content);
      setTaskColor(route?.params.task.taskColor);
      setDay(moment.utc(route?.params.task.day).format("YYYY-MM-DD"));
      // setTime(route?.params.task.time);
      setTime(
        route?.params.task.time
          ? moment(route?.params.task.time, "HH:mm:ss").format("HH:mm")
          : null
      );
      // setTime(route?.params.task.time ? route?.params.task.time : null);
    }
    // console.log("taskview day=", day);
    return () => {
      resetValues();
    };
  }, [visible, route?.params?.task]);

  useEffect(() => {
    console.log("canBack ?? ", canBack);
    if (canBack) {
      navigation.goBack();
    }
    return () => {};
  }, [canBack]);

  const taskColorTheme = (color) => {
    let colorValue;
    switch (color) {
      case "GREEN":
        return (colorValue = "#94C973");
      case "PINK":
        return (colorValue = "#BA4F6A");
      case "BLUE":
        return (colorValue = "#629DA3");
      case "NUDE":
        return (colorValue = "#C98345");
      case "BROWN":
        return (colorValue = "#8B440E");
      case "YELLOW":
        return (colorValue = "#D5AF10");
      case "RED":
        return (colorValue = "#BC3110");
      case "PURPLE":
        return (colorValue = "#603F8B");
      default:
        return (colorValue = TEXT_COLOR.PRIMARY);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: SIZES.base }}>
        <View style={[cardContainer, boxShadow]}>
          <View style={dotContainer}>
            <DotItem size={"m"} />
            <DotItem size={"m"} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboard}
          >
            <View style={[styles.section, { marginTop: SIZES.small }]}>
              <TextInput
                multiline={true}
                onChangeText={setTitle}
                // value={title}
                value={title}
                placeholder="Titre *"
                placeholderTextColor={error?.title ? "red" : TEXT_COLOR.PRIMARY}
                style={{
                  fontWeight: "normal",
                  fontFamily: FONTS.londrinaSolid.regular,
                  fontSize: SIZES.base + 1,
                  color: taskColorTheme(taskColor),
                }}
                maxLength={100}
                autoCorrect={false}
              />
              {/* {error?.title ? <Text> {error.title.value}</Text> : null} */}
            </View>
            <View style={styles.section}>
              <TextInput
                onChangeText={setContent}
                value={content}
                multiline={true}
                placeholder="Ajouter une tâche..."
                placeholderTextColor={TEXT_COLOR.PRIMARY}
                style={{
                  fontFamily: FONTS.mukta.regular,
                  fontSize: SIZES.base,
                  color: TEXT_COLOR.PRIMARY,
                  borderWidth: 0,
                  paddingHorizontal: 0,
                  marginVertical: 0,
                }}
                maxLength={2000}
                autoCorrect={false}
              />
            </View>
          </KeyboardAvoidingView>

          <View style={styles.section}>
            <Text style={styles.label}>Couleur:</Text>
            <View style={styles.colorRow}>
              {CARD_THEME.map((el) => (
                <ColorPreview
                  color={el.value}
                  key={el.value}
                  onPressColor={() => {
                    //On attribut la value pour l'afficher dynamiquement au click
                    setActiveColor(taskColorTheme(el.color));
                    //On enregistre dans la task l'objet
                    setTaskColor(el.color);
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
            </TouchableOpacity>

            {visible ? (
              <CalendarItem
                // onDayPress={(day) => {
                //   console.log(day);
                //   setDay(day.dateString);
                // }}
                day={day}
                setDay={setDay}
                coloredBackground={true}
                setVisible={setVisible}
                withDot={false}
              />
            ) : null}
          </View>

          <View style={styles.section}>
            <TouchableOpacity onPress={() => setTimeModalVisible(true)}>
              {!time ? (
                <Text style={styles.text}>+ Ajouter une heure ? </Text>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>
                    {moment(time, "HH:mm:ss").format("HH:mm")}
                  </Text>
                </View>
              )}

              {/* {!time ? (
                <Text style={styles.text}>+ Ajouter une heure ? </Text>
              ) : null}
              {time ? (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>
                    {moment(time, "HH:mm:ss").format("HH:mm")}
                  </Text>
                </View>
              ) : null} */}
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

          {route?.params?.task ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Supprimer cette tâche?", null, [
                    {
                      text: "Annuler",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        console.log(
                          "OK Pressed, suppression de la task id=",
                          taskId
                        );
                        deleteTask(taskId);
                        navigation.goBack();
                      },
                    },
                  ]);
                }}
              >
                <Ionicons
                  name="md-trash"
                  size={27}
                  color={TEXT_COLOR.SECONDARY}
                />
              </TouchableOpacity>
              <Button
                label={"Modifier"}
                onPress={() => {
                  console.log(taskId);
                  updateTask(taskId);
                  // navigation.goBack();
                }}
                containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
              />
            </View>
          ) : (
            <View style={[styles.section, { alignItems: "flex-end" }]}>
              <Button
                label={"Enregistrer"}
                onPress={() => {
                  addNewTask();
                  // navigation.goBack();
                }}
                containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
              />
            </View>
          )}
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
  text: {
    fontFamily: FONTS.mukta.regular,
    fontSize: SIZES.base,
    color: TEXT_COLOR.PRIMARY,
  },
  keyboard: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#708090",
    padding: 8,
  },
});
