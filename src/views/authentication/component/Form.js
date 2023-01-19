import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { CARDS, RADIUS, SIZES } from "../../../theme";

export default function form() {
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
    <View>
      <View style={styles.section}>
        {/* <Text style={[styles.label, { color: colors.text }]}>Identifiant</Text> */}
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

      <View style={styles.section}>
        {/* <Text style={[styles.label, { color: colors.text }]}>Identifiant</Text> */}
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
              placeholder="Email"
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
        {/* <Text style={[styles.label, { color: colors.text }]}>Identifiant</Text> */}
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
              placeholder="password"
              keyboardType="visible-password"
              style={styles.input}
              maxLength={200}
            />
          )}
          name="password"
        />
        <Text style={styles.error}>{errors.password?.message}</Text>
      </View>

      <View style={styles.section}>
        {/* <Text style={[styles.label, { color: colors.text }]}>Identifiant</Text> */}
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
              placeholder="confirmPassword"
              keyboardType="visible-password"
              style={styles.input}
              maxLength={200}
            />
          )}
          name="confirmPassword"
        />
        <Text style={styles.error}>{errors.confirmPassword?.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {},
  input: {
    borderWidth: 2,
    borderColor: CARDS,
    borderRadius: RADIUS.rectangle,
    height: 40,
    paddingHorizontal: SIZES.xs,
  },
});
