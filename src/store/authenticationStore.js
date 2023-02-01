import { action, map } from "nanostores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  USERNAME_KEY,
  USER_EMAIL_KEY,
  USER_KEY,
  USER_TOKEN_KEY,
} from "../settings";
import {
  delete_user,
  get_token,
  get_user,
  signup,
  update_user,
} from "../providers/UserProvider";

/**
 * @module authentication Store -
 * @description  Persistance des données d'authentification à travers l'app.
 * Permet  de stocker et changer toutes les données
 * inherentes à l'etat de la navigation par la bottomTab
 *
 */

/**
 * Initialisation du store avec defauls values et formats
 */
export const authenticationStore = map({
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
  message: null,
});

/**
 * Action permettant le changement du contenu du formulaire et des boutons
 */
export const setFormContent = action(
  authenticationStore,
  "formContent",
  (store, formContent) => {
    store.setKey("formContent", formContent);
  }
);

/**
 * Action permettant le changelent du username
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
 * Action permettant de changer les password
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
    // store.setKey("username", "");
    store.setKey("email", "");
    store.setKey("password", "");
    store.setKey("confirmPassword", "");
    store.setKey("passwordVisible", false);
    store.setKey("confirmPasswordVisible", false);
    store.setKey("error", null);
  }
);

/**
 * Action permettant de changer le User
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
 * Action permettant de changer et afficher les erreurs
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
 * Action permettant de mettre un message
 */
export const setMessage = action(
  authenticationStore,
  "setMessage",
  (store, message) => {
    store.setKey("message", message);
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
        setUsername(user.username);

        resetValues();
        setloading(false);
      }

      //Recuperation du username eventuel en asyncstorage
    } catch (error) {
      //On supprime l'affichage du loading
      setloading(false);
      //On affiche l'erreur
      setError(`Oops! Erreurs d'identifcation!`);
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
      setError("Cet identifiant est déja enregistré. Connectez-vous.");
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
 * Action permettant devider dans async storage une valeur unique
 */
export const removeStoreData = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
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

    if (userToken) {
      try {
        const user = await get_user(userToken);
        if (user) {
          setUser(user);
          setUsername(user.username);
          storeData(USER_KEY, user.username);
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

  } catch (e) {
    // error reading value
    throw Error(`AsyncStorage Error: Can't value for USER_TOKEN: ${e}`);
  }
};

/**
 * Action de logout
 */
export const logout = async () => {
  try {
    //On affiche le loading
    setloading(true);

    //On supprime le token du storage
    removeStoreData(USER_TOKEN_KEY);
    //On supprime le user du state
    setUser(null);
    //On supprime l'affichage du loading
    setloading(false);
  } catch (error) {
    console.log("ERROR", error);
    //On supprime l'affichage du loading
    setloading(false);
    //On affiche l'erreur
    setError("Oopss!");
  }
};

/**
 * Action permettant d'envoyer la request updateuser
 */
export const updateUser = action(
  authenticationStore,
  "updateUser",
  async (store, data) => {
    //On affiche le loading
    // setloading(true);
    // const password = data.password;

    //Recuperation de du user dans le
    const { user } = store.get();

    try {
      let newUser = {};
      //On affiche le loading
      setloading(true);
      const newUsername = data.username;

      const id = user.userId;

      //Recuperation du token
      const userToken = await getStoreData(USER_TOKEN_KEY);

      setloading(false);

      //Le password ne peut qu'etre vide ou avec 5 caractères mini

      if (data.password == "" && newUsername !== user.username) {
        //Si password est vide, on cre la request avec uniquement le username
        //Mais seulement si celui-ci est different du user.username stocker au login
        newUser = { username: data.username };

        //Le provider retourne la response.status
        const response = await update_user(userToken, id, newUser);
        if (response == 200) {
          console.log("modifié");
          //On change le username dans le store
          setUsername(data.username);
          //On affiche le message de confirmation
          setMessage("Username modifié avec succès!");
          //On repasse la valeur du message à null avec 5s de retard
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } else {
          setError({
            api: {
              value:
                "Oopss! Erreur interne. Merci de retenter dans un instant.",
            },
          });
        }
      } else if (data.password && newUsername) {
        newUser = { username: data.username, password: data.password };

        const response = await update_user(userToken, id, newUser);
        if (response == 200) {
          //On supprime le token
          removeStoreData(USER_TOKEN_KEY);

          logout();
          logUser({ email: user.email, password: newUser.password });
        } else {
          setError({
            api: {
              value:
                "Oopss! Erreur interne. Merci de retenter dans un instant.",
            },
          });
        }
      }
    } catch (error) {
      //On supprime l'affichage du loading
      setloading(false);
      //On affiche l'erreur
      setError("Oopss!");
    }
  }
);

/**
 * Action permettant d'envoyer la request updateuser
 */
export const deleteUser = action(
  authenticationStore,
  "deleteUser",
  async (store) => {
    try {
      //On affiche le loading
      setloading(true);
      //Recuperation du user dans le
      const { user } = store.get();

      const id = user.userId;

      //Recuperation du token
      const userToken = await getStoreData(USER_TOKEN_KEY);
      //Le provider retourne la response.status
      const response = await delete_user(userToken, id);
      if (response == 200) {
        setloading(false);
        logout()
        //On supprime le token
        removeStoreData(USER_TOKEN_KEY);
        resetValues();
      } else {
        setloading(false);
        setError({
          api: {
            value: "Oopss! Erreur interne. Merci de retenter dans un instant.",
          },
        });
      }
    } catch (error) {
      //On supprime l'affichage du loading
      setloading(false);
      //On affiche l'erreur
      setError("Oopss!");
    }
  }
);
