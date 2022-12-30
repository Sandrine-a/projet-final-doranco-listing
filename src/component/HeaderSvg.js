import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function HeaderSvg() {
  return (
    <View>
      <Svg
        width="390"
        height="207"
        viewBox="0 0 390 207"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M190.434 155.866C261.882 92.6668 261.259 89.6739 238 1H1V162.097L24.9457 176.031C34.0663 181.339 43.9694 185.169 54.2875 187.38L79.5385 192.791C104.167 198.068 129.879 193.858 151.538 181.001L175.292 166.899C180.673 163.705 185.747 160.012 190.434 155.866Z"
          fill="#FFE3A1"
          stroke="#FFE3A1"
        />
        <Path
          d="M219.96 159.937C157.103 94.333 166.385 76.1612 189.573 1H390V166.93L370.862 179.745C361.191 186.221 350.464 190.959 339.164 193.746L328.834 196.293C301.205 203.106 271.982 197.825 248.485 181.774L234.792 172.42C229.447 168.769 224.439 164.611 219.96 159.937Z"
          fill="#FFD46E"
          fill-opacity="0.9"
          stroke="#FFD46E"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
