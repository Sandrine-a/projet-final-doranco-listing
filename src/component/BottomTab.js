import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import {
  boxShadow,
  CARDS,
  COLORS,
  ICON_SIZES,
  RADIUS,
  SIZES,
  TEXT_COLOR,
} from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function BottomTab({ onlyCloseButton = false }) {
  const { height, width, scale, fontScale } = useWindowDimensions();

  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, { width: width, justifyContent: "center" }]}
    >
      {!onlyCloseButton ? (
        <View
          style={[
            styles.tabSection,
            {
              width: width * 0.4,
              backgroundColor: CARDS,
              borderTopRightRadius: RADIUS.rond,
            },
          ]}
        >
          <TouchableOpacity>
            <FontAwesome
              name="calendar"
              size={ICON_SIZES.base}
              color={TEXT_COLOR.PRIMARY}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      <View
        style={{
          width: width * 0.2,
          alignItems: "center",
          paddingBottom: SIZES.base,
        }}
      >
        <TouchableOpacity
          style={[
            styles.middleButton,
            boxShadow,
            {
              borderColor: onlyCloseButton ? CARDS : TEXT_COLOR.PRIMARY,
              backgroundColor: onlyCloseButton
                ? COLORS.PRIMARY_LIGHT
                : COLORS.SECONDARY,
            },
          ]}
          onPress={() =>
            onlyCloseButton
              ? navigation.goBack()
              : navigation.navigate("TasksView")
          }
        >
          <FontAwesome
            name={onlyCloseButton ? "close" : "plus"}
            size={ICON_SIZES.base}
            color={TEXT_COLOR.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      {!onlyCloseButton ? (
        <View
          style={[
            styles.tabSection,
            {
              width: width * 0.4,
              backgroundColor: CARDS,
              borderTopLeftRadius: RADIUS.rond,
            },
          ]}
        >
          <TouchableOpacity>
            <FontAwesome5
              name="user"
              size={ICON_SIZES.base}
              color={TEXT_COLOR.PRIMARY}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {/* <Text>Bottom</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 60,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  tabSection: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  middleButton: {
    borderRadius: RADIUS.rond,
    borderWidth: 3,

    width: 50,
    height: 50,

    justifyContent: "center",
    alignItems: "center",
  },
});
