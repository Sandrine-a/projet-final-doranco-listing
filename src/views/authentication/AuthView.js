import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
// import * as Linking from "expo-linking";
import { useRoute } from "@react-navigation/native";

import { COLORS, FONTS, SIZES, TEXT_COLOR } from "../../theme";
import Form from "./component/Form";
import Button from "../../component/Button";
import { useStore } from "@nanostores/react";
import {
  authenticationStore,
  logUser,
  onSubmitSignup,
  resetValues,
  setFormContent,
} from "../../store/authenticationStore";
import { EMAIL_FIELD_PATTERN } from "../../settings";

export default function AuthView({ navigation }) {
  const { width, height } = useWindowDimensions();
  const {
    formContent,
    email,
    username,
    password,
    confirmPassword,
    loading,
    error,
  } = useStore(authenticationStore);

  const {
    control,
    handleSubmit,
    setFocus,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    },
  });

  useEffect(() => {
    return () => {
      reset();
      resetValues()
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: SIZES.base }}
        >
          <View
            style={[
              styles.logoContainer,
              { height: height * 0.2 /*  backgroundColor: "red"  */ },
            ]}
          >
            <Image
              style={styles.logo}
              source={require("../../../assets/logo.png")}
              resizeMode={"contain"}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center" /* height: height * 0.1  */,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.londrinaSolid.black,
                fontSize: SIZES.large * 1.5,
                color: TEXT_COLOR.SECONDARY,
              }}
              numberOfLines={1}
            >
              {formContent == "signup"
                ? "Bienvenue sur"
                : "Content de vous voir sur"}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.oswald.bold,
                fontSize: SIZES.large * 2.5,
                color: COLORS.PRIMARY_DARK,
              }}
            >
              Listing
            </Text>
          </View>

          {/* <Text>
            {urlData ? JSON.stringify(urlData) : "APP NOT OPEN WITH DEEPLINK"}
          </Text> */}

          {/* <View style={styles.centerContainer}> */}
          <Form
            formContent={formContent}
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
            getValues={getValues}
            reset={reset}
            resetValues={resetValues}
            email={email}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            EMAIL_FIELD_PATTERN={EMAIL_FIELD_PATTERN}
          />
          {/* </View> */}
          {formContent == "login" ? (
            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() => {
                  //On ouvre la modale
                  navigation.navigate("ForgotPasswordView");
                }}
              >
                <Text style={styles.text}>Mot de passe oublié</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {!loading ? (
            <View style={styles.buttonContainer}>
              {formContent == "signup" ? (
                <Button
                  label={"S'inscrire"}
                  containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
                  onPress={handleSubmit(onSubmitSignup)}
                />
              ) : (
                <Button
                  label={"Se connecter"}
                  containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
                  onPress={handleSubmit(logUser)}
                />
              )}
            </View>
          ) : (
            <View style={styles.buttonContainer}>
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
            </View>
          )}

          <View style={styles.linkContainer}>
            <Text style={styles.text}>
              {" "}
              {formContent == "signup"
                ? "Déjà inscrit ?"
                : "Pas encore de compte ? "}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                reset();
                resetValues();
                formContent == "signup"
                  ? setFormContent("login")
                  : setFormContent("signup");
              }}
            >
              <Text
                style={{
                  color: COLORS.TERTIARY,
                  fontFamily: FONTS.mukta.semiBold,
                  fontSize: SIZES.base,
                }}
              >
                {formContent == "signup" ? " Se connecter" : "S'inscrire"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.large,
  },
  logo: {
    width: 150,
  },
  buttonContainer: {
    margin: SIZES.small,
    paddingHorizontal: SIZES.large,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: TEXT_COLOR.PRIMARY,
    fontFamily: FONTS.mukta.regular,
    fontSize: SIZES.base,
  },
  error: {
    color: "red",
    paddingHorizontal: SIZES.xs,
    fontFamily: FONTS.mukta.regular,
    textAlign: "center",
    // fontSize: SIZES.base
  },
});
