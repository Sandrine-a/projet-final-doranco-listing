import { action, map } from "nanostores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERNAME_KEY, USER_KEY, USER_TOKEN_KEY } from "../settings";
import { get_token, get_user, login, signup } from "../providers/UserProvider";

export const authenticationStore = map({
  loading: false,
  formContent: "login",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  user: null,
  loading: false,
  error: null,
  passwordVisible: false,
  confirmPasswordVisible: false,
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

/**
 * Action permettant de vider les valeurs
 */
export const resetValues = action(
  authenticationStore,
  "resetValues",
  (store) => {
    store.setKey("username", "");
    store.setKey("email", "");
    store.setKey("password", "");
    store.setKey("confirmPassword", "");
    store.setKey("passwordVisible", false);
    store.setKey("confirmPasswordVisible", false);
  }
);

/**
 * Action permettant de changer le loading
 */
export const setUser = action(authenticationStore, "setUser", (store, user) => {
  store.setKey("user", user);
});

/**
 * Action permettant de changer le loading
 */
export const setloading = action(
  authenticationStore,
  "setloading",
  (store, loading) => {
    store.setKey("loading", loading);
  }
);

/**
 * Action permettant de changer le loading
 */
export const setError = action(
  authenticationStore,
  "setError",
  (store, error) => {
    store.setKey("error", error);
  }
);

/**
 * Action permettant d'afficher/cacher le password
 */
export const setPasswordVisible = action(
  authenticationStore,
  "setPasswordVisible",
  (store, passwordVisible) => {
    store.setKey("passwordVisible", passwordVisible);
  }
);

/**
 * Action permettant d'afficher/cacher le cofirmPassword
 */
export const setConfirmPasswordVisible = action(
  authenticationStore,
  "setConfirmPasswordVisible",
  (store, confirmPasswordVisible) => {
    store.setKey("confirmPasswordVisible", confirmPasswordVisible);
  }
);

/**
 * Action permettant d'envoyer la request login
 */
export const logUser = action(
  authenticationStore,
  "onSubmit",
  async (store, data) => {
    //On affiche le loading
    setloading(true);

    const email = data.email.toLowerCase();
    const password = data.password;

    try {
      //Demande de token
      const data = await get_token(email, password);
      // Le provider ne renvoie la reponse que si Req du server a reussi
      if (data) {
        storeData(USER_TOKEN_KEY, data.token);

        //On get_user
        const user = await get_user(data.token);
        //On le met dans le store
        setUser(user);

        console.log("user is =", user);
        resetValues();
        setloading(false);
      }

      //Recuperation du username eventuel en asyncstorage
    } catch (error) {
      //On supprime l'affichage du loading
      setloading(false);
      //On affiche l'erreur
      setError("Oopss!");
    }
  }
);

/**
 * Action permettant d'envoyer la request signup
 */
export const onSubmitSignup = action(
  authenticationStore,
  "onSubmit",
  async (store, data) => {
    try {
      //On affiche le loading
      setloading(true);
      //On recupere les donnes et on transforme l'email en lowerCase
      const email = data.email.toLowerCase();
      const username = data.username;
      const password = data.password;

      //On applique le toLowerCase car en database on a une contrainte islower (entre autre)
      const user = await signup(email, username, password);
      // Le provider ne renvoie la reponse que si Req du server a reussi
      if (user) {
        //On connecte l'utilisateur automatiquement
        const { email, password } = data;
        logUser({ email, password });
        resetValues();
        setloading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      //On supprime l'affichage du loading
      setloading(false);
      //On affiche l'erreur
      setError("Oopss!");
    }
  }
);

/**
 * Action permettant d'envoyer async storage une valeur unique
 */
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw Error(`AsyncStorage Error: Can't store value for ${value} in ${key}`);
  }
};

/**
 * Action permettant de recupérer dans async storage une valeur unique
 */
export const getStoreData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw Error(`AsyncStorage Error: get value in key: ${key}`);
  }
};

/**
 * Action d'autoconnecter l'user
 */
export const autoConnect = async () => {
  try {
    //On affiche le loading
    setloading(true);

    const userToken = await getStoreData(USER_TOKEN_KEY);

    console.log("usertoken found = ", userToken);
    if (userToken) {
      try {
        const user = await get_user(userToken);
        if (user) {
          setUser(user);
        }
      } catch (e) {
        console.log("ERROR =", e);
      } finally {
        //On affiche le loading
        setloading(false);
      }
    } else {
      setloading(false);
      //On retourne la page

      return;
    }

    //On recupère le token
  } catch (e) {
    // error reading value
    throw Error(`AsyncStorage Error: Can't value for USER_TOKEN: ${e}`);
  }
};
