import {
  Animated,
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
  setPasswordVisible,
} from "../../store/authenticationStore";
import Form from "./component/Form";
import { EMAIL_FIELD_PATTERN } from "../../settings";
import Button from "../../component/Button";
import { useEffect } from "react";

export default function ForgotPasswordView({ navigation, route }) {
  const { current } = useCardAnimation();
  const { email, password } = route?.params;
  const { canGoBack, loading, passwordVisible, urlData, error, message } =
    useStore(authenticationStore);
  const routeName = route.name;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      password: password,
    },
  });

  useEffect(() => {
    if (canGoBack) {
      navigation.goBack();
    }
    return () => {
      reset();
      resetValues();
    };
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor:
              routeName === "ForgotPasswordView"
                ? "rgba(153, 153, 153, 0.9)"
                : "rgba(153, 153, 153, 1)",
          },
        ]}
        onPress={() =>
          routeName === "ForgotPasswordView"
            ? navigation.goBack()
            : navigation.navigate("AuthView")
        }
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
        <View style={styles.section}>
          {routeName === "ForgotPasswordView" ? (
            <Text style={{ fontFamily: FONTS.mukta.regular }}>
              Entrez votre adresse email et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </Text>
          ) : (
            <Text style={{ fontFamily: FONTS.mukta.regular }}>
              Nouveau mot de passe
            </Text>
          )}
        </View>

        {routeName === "ForgotPasswordView" ? (
          <View style={styles.section}>
            <Text style={styles.label}>Identifiant</Text>

            <Controller
              control={control}
              rules={{
                required: "Ce champs est obligatoire",
                minLength: {
                  value: 3,
                  message: "Min. 3 caractères",
                },
                maxLength: {
                  value: 200,
                  message: "Maximum de caractères",
                },
                pattern: {
                  value: EMAIL_FIELD_PATTERN,
                  message: "Format: exemple@mail.com",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email: exemple@mail.com *"
                  keyboardType="email-address"
                  style={styles.input}
                  maxLength={200}
                  autoCapitalize="none"
                  placeholderTextColor={TEXT_COLOR.SECONDARY}
                />
              )}
              name="email"
            />
            <Text style={styles.error}>{errors.email?.message}</Text>
          </View>
        ) : (
          <View>
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
                        name={
                          passwordVisible ? "eye-outline" : "eye-off-outline"
                        }
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
        )}

        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontFamily: FONTS.oswald.medium }}>Annuler</Text>
            </TouchableOpacity>
            <Button
              label={"Envoyer un email"}
              containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
              onPress={handleSubmit(sendForgotEmail)}
            /> */}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {!loading && !message ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                routeName === "ForgotPasswordView"
                  ? navigation.goBack()
                  : navigation.navigate("AuthView")
              }
            >
              <Text style={{ fontFamily: FONTS.oswald.medium }}>Annuler</Text>
            </TouchableOpacity>
            {routeName === "ForgotPasswordView" ? (
              <Button
                label={"Envoyer un email"}
                containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
                onPress={handleSubmit(sendForgotEmail)}
              />
            ) : (
              <Button
                label={"Changer"}
                containerStyle={{ backgroundColor: COLORS.PRIMARY_DARK }}
                onPress={handleSubmit(resetPassword)}
              />
            )}
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
              onPress={() => navigation.navigate("AuthView")}
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
});
