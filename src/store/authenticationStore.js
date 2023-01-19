import { action, map } from "nanostores";

export const authenticationStore = map({
  loading: false,
  formContent: "login",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

/**
 * Action permettant le contenu du formulaire et des boutons
 */
export const setFormContent = action(
  authenticationStore,
  "formContent",
  (store, formContent) => {
    store.setKey("formContent", formContent);
  }
);

/**
 * Action permettant l'username
 */
export const setUsername = action(
  authenticationStore,
  "setUsername",
  (store, username) => {
    store.setKey("username", username);
  }
);

/**
 * Action permettant de changer l'email
 */
export const setEmail = action(
  authenticationStore,
  "setEmail",
  (store, email) => {
    store.setKey("email", email);
  }
);

/**
 * Action permettant de changer le password
 */
export const setPassword = action(
  authenticationStore,
  "setPassword",
  (store, password) => {
    store.setKey("password", password);
  }
);

/**
 * Action permettant de changer le confirmPassword
 */
export const setConfirmPassword = action(
  authenticationStore,
  "setConfirmPassword",
  (store, confirmPassword) => {
    store.setKey("confirmPassword", confirmPassword);
  }
);
