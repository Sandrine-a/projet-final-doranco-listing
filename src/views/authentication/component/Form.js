import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import {
  CARDS,
  COLORS,
  FONTS,
  RADIUS,
  SIZES,
  TEXT_COLOR,
} from "../../../theme";
import {
  authenticationStore,
  setConfirmPasswordVisible,
  setPasswordVisible,
} from "../../../store/authenticationStore";
import { useStore } from "@nanostores/react";

export default function Form({
  formContent,
  control,
  errors,
  email,
  username,
  password,
  confirmPassword,
  getValues,
  EMAIL_FIELD_PATTERN,
}) {
  const { passwordVisible, confirmPasswordVisible } =
    useStore(authenticationStore);
  return (
    <View sylte={styles.container}>
      {formContent == "signup" ? (
        <View style={styles.section}>
          <Text style={styles.label}>Username</Text>
          <Controller
            control={control}
            rules={{
              required: "Ce champs est obligatoire",
              minLength: {
                value: 1,
                message: "Min. 4 caractères",
              },
              maxLength: {
                value: 100,
                message: "Maximum de caractères",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Username"
                style={styles.input}
                maxLength={100}
                placeholderTextColor={TEXT_COLOR.SECONDARY}
                autoCapitalize="none"
              />
            )}
            name="username"
          />
          <Text style={styles.error}>{errors.username?.message}</Text>
        </View>
      ) : null}

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
                keyboardType="visible-password"
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

      {/* {formContent == "signup" ? (
        <View style={styles.section}>
          <Text style={styles.label}>Confirmation du mot de passe</Text>
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
              validate: {
                matchesPreviousPassword: (value) => {
                  console.log(value);
                  const { password } = getValues();
                  if (password) {
                    return (
                      password === value || "Ne correspond pas au mot de passe."
                    );
                  }
                },
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
                  placeholder="Confirmation du mot de passe *"
                  blurOnSubmit={false}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  style={{
                    width: "90%",
                    fontFamily: FONTS.mukta.regular,
                    alignItems: "center",
                    marginRight: SIZES.xs,
                  }}
                  maxLength={200}
                  autoCapitalize="none"
                  secureTextEntry={confirmPasswordVisible ? false : true}
                  placeholderTextColor={TEXT_COLOR.SECONDARY}
                />
                <Ionicons
                  name={
                    confirmPasswordVisible ? "eye-outline" : "eye-off-outline"
                  }
                  size={24}
                  color={TEXT_COLOR.SECONDARY}
                  style={styles.inputIcon}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
              </View>
            )}
            name="confirmPassword"
          />
          <Text style={styles.error}>{errors.confirmPassword?.message}</Text>
        </View>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: SIZES.base,
    // backgroundColor: "red"
  },
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
    // fontSize: SIZES.base
  },
  inputIcon: {
    paddingRight: SIZES.xs,
  },
});
