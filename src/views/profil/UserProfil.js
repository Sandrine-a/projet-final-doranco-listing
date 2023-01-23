import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';

import { setViewActive } from "../../store/bottomTabNavStore";
import HeaderText from "../home/component/HeaderText";
import { SIZES, TEXT_COLOR } from "../../theme";
import BottomTab from "../../component/BottomTab";

export default function UserProfil({ navigation }) {
  useEffect(() => {
    setViewActive({ name: "monthView", active: true });

    return () => {
      setViewActive({ name: "monthView", active: false });
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/img/header.png")}
        resizeMode="cover"
        style={{ height: 210 }}
      >
        {/* <HeaderText /> */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: SIZES.base}}
        >
          <FontAwesome name="arrow-left" size={30} color={TEXT_COLOR.SECONDARY} />
        </TouchableOpacity>
      </ImageBackground>

      <View>
        <Text>UserProfil</Text>
      </View>

     <BottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
