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
  CARDS,
  COLORS,
  ICON_SIZES,
  RADIUS,
  SIZES,
  TEXT_COLOR,
} from "../../theme";

export default function BottomTab() {
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: width }]}>
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

      <View
        style={{
          width: width * 0.2,
          alignItems: "center",
          paddingBottom: SIZES.base,
        }}
      >
        <TouchableOpacity
          style={styles.middleButton}
          onPress={() => console.log("middle pressed")}
        >
          <FontAwesome
            name="plus"
            size={ICON_SIZES.base}
            color={TEXT_COLOR.PRIMARY}
          />
        </TouchableOpacity>
      </View>

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
    borderColor: TEXT_COLOR.PRIMARY,
    width: 50,
    height: 50,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: "center",
    alignItems: "center",
  },
});
