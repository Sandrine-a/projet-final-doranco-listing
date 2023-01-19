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
import { useForm, Controller } from "react-hook-form";
import { CARDS, FONTS, RADIUS, SIZES, TEXT_COLOR } from "../../../theme";

export default function Form({ formContent }) {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <View sylte={styles.container}>
      {formContent == "signup" ? (
        <View style={styles.section}>
          <Text style={styles.label}>Username *</Text>
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
              message: "Min. 4 caractères",
            },
            maxLength: {
              value: 200,
              message: "Maximum de caractères",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Mot de passe *"
              keyboardType="visible-password"
              style={styles.input}
              maxLength={200}
            />
          )}
          name="password"
        />
        <Text style={styles.error}>{errors.password?.message}</Text>
      </View>

      {formContent == "signup" ? (
        <View style={styles.section}>
          <Text style={styles.label}>Confirmation du mot de passe</Text>
          <Controller
            control={control}
            rules={{
              required: "Ce champs est obligatoire",
              minLength: {
                value: 5,
                message: "Min. 4 caractères",
              },
              maxLength: {
                value: 200,
                message: "Maximum de caractères",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Mot de passe, confirmation *"
                keyboardType="visible-password"
                style={styles.input}
                maxLength={200}
              />
            )}
            name="confirmPassword"
          />
          <Text style={styles.error}>{errors.confirmPassword?.message}</Text>
        </View>
      ) : null}
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
});
