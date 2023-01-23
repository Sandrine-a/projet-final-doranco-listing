// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// // import { createStackNavigator } from "@react-navigation/stack";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import DayView from "../views/home/DayView";
// import MonthView from "../views/home/MonthViewCalendar";
// import TasksView from "../views/tasks/TasksView";
// import UserProfil from "../views/profil/UserProfil";
// import BottomTab from "../component/BottomTab";
// import { useStore } from "@nanostores/react";
// import { authenticationStore } from "../store/authenticationStore";
// import { FONTS } from "../theme";

// // const Tab = createBottomTabNavigator();
// const BottomTabNav = createBottomTabNavigator();

// export default function BottomTabNavigation() {
//   // const RootStack = createNativeStackNavigator();

//   const { user } = useStore(authenticationStore);

//   return (
//     <BottomTabNav.Navigator
//       initialRouteName={"DayView"}
//       // tabBar={({ route }) => <BottomTab {...route} />}

//       // tabBar={route => <BottomTab {...route} />}

//       // tabBar={({ route, navigation }) => <BottomTab {...{route, navigation}} />}

//       // tabBar={({ route, navigation }) => <BottomTab  />}

//       // tabBar={({ route, navigation }) => <BottomTab route={route} navigation={navigation} />}

//       tabBar={({ route, navigation }) => (
//         <BottomTab route={route} navigation={navigation} />
//       )}
//     >
//       <BottomTabNav.Group screenOptions={{ headerShown: false }}>
//         <BottomTabNav.Screen
//           name="DayView"
//           component={DayView}
//           options={{ animation: "fade" }}
//         />
//         <BottomTabNav.Screen
//           name="MonthView"
//           component={MonthView}
//           options={{ animation: "fade" }}
//         />
//         <BottomTabNav.Screen
//           name="UserProfil"
//           component={UserProfil}
//           options={{ animation: "fade" }}
//         />
//       </BottomTabNav.Group>

//       <BottomTabNav.Group>
//         <BottomTabNav.Screen
//           name="TasksView"
//           component={TasksView}
//           options={({ route }) => ({
//             // title: "Créer un rdv",
//             // title: route.params.title,
//             // title: route.params && route.params.title ? route.params.title : "",
//             // title: route.params ? route.params.title : "Créer un rdv",
//             title: "Créer un rdv",
//             headerTitleStyle: {
//               fontFamily: FONTS.oswald.bold,
//             },
//             headerShadowVisible: false,
//             animation: "slide_from_bottom",
//             headerBackTitleVisible: false,
//           })}
//         />
//       </BottomTabNav.Group>

//       {/* <BottomTabNav.Screen name="TasksView" component={TasksView} /> */}
//       {/* <BottomTabNav.Screen name="monthView" component={MonthView} /> */}
//       {/* <BottomTabNav.Screen name="userProfil" component={UserProfil} options={{ headerShown: false }}/> */}
//     </BottomTabNav.Navigator>
//   );
// }

// const styles = StyleSheet.create({});
