import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useCardAnimation } from "@react-navigation/stack";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import { CARDS, COLORS, FONTS, RADIUS, SIZES, TEXT_COLOR } from "../../theme";
import { useStore } from "@nanostores/react";
import {
  authenticationStore,
  resetPassword,
  resetValues,
  sendForgotEmail,
  setCanGoBack,
  setEmail,
  setMessage,
  setPasswordVisible,
  setUrlData,
} from "../../store/authenticationStore";
import Form from "./component/Form";
import { EMAIL_FIELD_PATTERN } from "../../settings";
import Button from "../../component/Button";
import { useEffect } from "react";

export default function ResetPasswordView({ navigation, route }) {
  const { current } = useCardAnimation();
  // const { email, password } = route?.params;
  const {
    canGoBack,
    loading,
    passwordVisible,
    urlData,
    error,
    message,
    password,
  } = useStore(authenticationStore);
  const routeName = route.name;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: password,
    },
  });

  useEffect(() => {
    setMessage(null);
    return () => {
      reset();
      setUrlData(null);
      resetValues();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(153, 153, 153, 1)",
          },
        ]}
        onPress={() => {
          // resetValues();
          navigation.navigate("AuthView");
        }}
      />

      <Animated.View
        style={{
          padding: 16,
          width: "90%",
          maxWidth: 400,
          borderRadius: RADIUS.rectangle,
          backgroundColor: "white",
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View style={[styles.logoContainer, styles.section, { height: 80 }]}>
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
            resizeMode={"contain"}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={{
              fontFamily: FONTS.oswald.bold,
              fontSize: SIZES.large * 1.5,
              color: COLORS.PRIMARY_DARK,
              textAlign: "center",
            }}
          >
            Listing
          </Text>
        </View>
        <View style={styles.section}>
          <Text
            style={{
              fontFamily: FONTS.mukta.regular,
              color: TEXT_COLOR.PRIMARY,
            }}
          >
            Nouveau mot de passe
          </Text>
        </View>

        <View style={styles.section}>
          {!message ? (
            <View style={styles.section}>
              <Text style={styles.label}>Mot de passe</Text>
              <Controller
                control={control}
                rules={{
                  required: "Ce champs est obligatoire",
                  minLength: {
                    value: 5,
                    message: "Min. 5 caractères",
                  },
                  maxLength: {
                    value: 200,
                    message: "Maximum de caractères",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      styles.input,
                      { flexDirection: "row", alignItems: "center" },
                    ]}
                  >
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Mot de passe *"
                      textContentType="password"
                      style={{
                        width: "90%",
                        fontFamily: FONTS.mukta.regular,
                        alignItems: "center",
                        marginRight: SIZES.xs,
                      }}
                      maxLength={200}
                      autoCapitalize="none"
                      secureTextEntry={passwordVisible ? false : true}
                      placeholderTextColor={TEXT_COLOR.SECONDARY}
                    />
                    <Ionicons
                      name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color={TEXT_COLOR.SECONDARY}
                      style={styles.inputIcon}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  </View>
                )}
                name="password"
              />
              <Text style={styles.error}>{errors.password?.message}</Text>
            </View>
          ) : (
            <View style={styles.section}>
              <Text
                style={{
                  fontFamily: FONTS.mukta.medium,
                  color: COLORS.SECONDARY_DARK,
                  fontSize: SIZES.base,
                }}
              >
                {message}
              </Text>
            </View>
          )}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {!loading && !message ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("AuthView")}>
              {!canGoBack ? (
                <Text
                  style={{
                    fontFamily: FONTS.oswald.medium,
                    color: TEXT_COLOR.SECONDARY,
                  }}
                >
                  Annuler
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: FONTS.oswald.medium,
                    color: TEXT_COLOR.SECONDARY,
                  }}
                >
                  Fermer
                </Text>
              )}
            </TouchableOpacity>
            {!canGoBack ? (
              <Button
                label={"Changer"}
                containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
                onPress={handleSubmit(resetPassword)}
              />
            ) : null}
          </View>
        ) : loading && !message ? (
          <Text
            style={{
              textAlign: "center",
              color: COLORS.SECONDARY_DARK,
              fontWeight: "bold",
              fontFamily: FONTS.mukta.medium,
              fontSize: SIZES.base,
            }}
          >
            Chargement en cours...
          </Text>
        ) : (
          <View>
            <Button
              label={"Retour"}
              containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
              onPress={() => {
                setMessage(null);
                reset();
                navigation.navigate("AuthView");
              }}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  section: {
    marginVertical: SIZES.xs,
  },
  label: {
    paddingLeft: SIZES.xs,
    fontFamily: FONTS.oswald.regular,
    color: TEXT_COLOR.PRIMARY,
  },
  input: {
    borderWidth: 2,
    borderColor: CARDS,
    borderRadius: RADIUS.rectangle,
    height: 40,
    paddingHorizontal: SIZES.xs,
    fontFamily: FONTS.mukta.regular,
  },
  error: {
    color: "red",
    paddingHorizontal: SIZES.xs,
    fontFamily: FONTS.mukta.regular,
  },
  buttonContainer: {
    margin: SIZES.small,
    paddingHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red"
  },
  logo: {
    width: 100,
  },
});
