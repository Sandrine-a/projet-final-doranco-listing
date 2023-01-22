import { action, map } from "nanostores";
import moment from "moment";
import "moment/locale/fr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TasksProvider, {
  create_task,
  delete_task,
  get_all_tasks,
} from "../providers/TasksProvider";
import { USER_TOKEN_KEY } from "../settings";

export const calendarStore = map({
  taskId: undefined,
  title: "",
  content: "",
  taskColor: {},
  day: moment(new Date()).format("YYYY-MM-DD"),
  time: "",
  tasksList: [],
  month: moment(new Date()).format("MM"),
  loading: false,
  error: null,
  noTask: false,
  currentDay: [],
});

/**
 * Action permettant de changer le titre
 */
export const setTitle = action(calendarStore, "setTitle", (store, title) => {
  store.setKey("title", title);
});

/**
 * Action permettant de changer le content
 */
export const setContent = action(
  calendarStore,
  "setContent",
  (store, content) => {
    store.setKey("content", content);
  }
);

/**
 * Action permettant de changer la couleur
 */
export const setTaskColor = action(
  calendarStore,
  "setTaskColor",
  (store, color) => {
    store.setKey("taskColor", color);
  }
);

/**
 * Action permettant de changer la date
 */
export const setDay = action(calendarStore, "setDay", (store, day) => {
  store.setKey("day", day);
});

/**
 * Action permettant de changer l'heure'
 */
export const setTime = action(calendarStore, "setTime", (store, time) => {
  store.setKey("time", `${time.hours}:${time.minutes}`);
});

/**
 * Action permettant de changer le mois
 */
export const setMonth = action(calendarStore, "setMonth", (store, month) => {
  store.setKey("month", month);
});

/**
 * Action permettant de changer le loading
 */
export const setloading = action(
  calendarStore,
  "setloading",
  (store, loading) => {
    store.setKey("loading", loading);
  }
);

/**
 * Action permettant de changer et afficher les erreurs
 */
export const setError = action(calendarStore, "setError", (store, error) => {
  store.setKey("error", error);
});

/**
 * Action lancé au démarrage du login permettant de récupérer
 * un utilisateur si ce dernier est contenu dans le AsyncStorage
 * de votre téléphone
 */
export const initHomePage = action(
  calendarStore,
  "initHomePage",
  async (store) => {
    // On fait charger le composant
    store.setKey("loading", true);
    try {
      //On affiche le loading
      setloading(true);
      console.log("INIT");
      const userToken = await getStoreData(USER_TOKEN_KEY);

      const result = await get_all_tasks(userToken);
      if (result) {
        console.log("yes lenght =", result.data.length);
        // console.log("yes data", result.data);

        //On met toutes les tasks dans le store
        store.setKey("tasksList", result.data);
        createDayBoard(result.data);
      } else {
        setloading(false);
        console.log("NO datas");
        //AJOUTER ERREUR
        setError("Oppps error get_all_tasks");
      }

      // On indique que l'utilisateur est connéctér
      store.setKey("loading", false);
      // store.setKey('user', user)
    } catch (e) {
      // error reading value
      throw Error(` ${e}`);
    }
  }
);

/**
 * Action permettant d'ajouter à la liste
 */
export const addNewTask = action(calendarStore, "addNewTask", async (store) => {
  //Recuperation des tasks
  const { title, content, taskColor, day, time, tasksList } = store.get();
  try {
    //On affiche le loading
    setloading(true);

    //Creation du new task
    const task = {
      title: title,
      content: content,
      taskColor: taskColor,
      day: day,
      time: time,
    };
    console.log(task);

    //Recuperation du token pour envoyer au provider
    const userToken = await getStoreData(USER_TOKEN_KEY);

    //Envoi de la requete au server
    const result = await create_task(userToken, task);
    if (result) {
      console.log("Result dans store", result);

      setloading(false);
    } else {
      setloading(false);
      console.log("NO datas");
      //AJOUTER ERREUR
      setError("Oppps error get_all_tasks");
    }
  } catch (e) {
    // error reading value
    throw Error(` ${e}`);
  }

  //Creation du nouveau tableau contenant la nouvelle task
  // const newTask = [task, ...tasksList];
  // console.log(newTask);
  //MAJ de la lsite des taches
  // store.setKey("tasksList", newTask);

  // Remise a l'état initial des valeurs du store
  // store.setKey("tasksList", '')
  store.setKey("title", "");
  store.setKey("content", "");
  store.setKey("taskColor", "");
  store.setKey("day", moment(new Date()).format("YYYY-MM-DD"));
  store.setKey("time", "");
  store.setKey("month", moment(new Date()).format("MM"));
});

/**
 * Action permettant de supprimer tache de la liste
 */
export const deleteTask = action(
  calendarStore,
  "deletTask",
  async (store, taskId) => {
    try {
      //On affiche le loading
      setloading(true);
      //Recuperation du token pour envoyer au provider
      const userToken = await getStoreData(USER_TOKEN_KEY);

      const response = await delete_task(userToken, taskId);
      if (response) {
        setloading(false);
      } else {
        setloading(false);
        console.log("NO datas");
        //AJOUTER ERREUR
        setError("Oppps error get_all_tasks");
      }
    } catch (error) {
      setloading(false);
      setError("OOPSSS");
      // error reading value
      throw Error(` ${e}`);
    }
  }
);

/**
 * Action permettant reset les valeur
 */
export const resetValues = action(
  calendarStore,
  "resetValues",
  async (store) => {
    // Remise a l'état initial des valeurs du store
    // store.setKey("tasksList", '')
    store.setKey("title", "");
    store.setKey("content", "");
    store.setKey("taskColor", "");
    // store.setKey("day", moment(new Date()).format("YYYY-MM-DD"));
    store.setKey("time", "");
  }
);

/**
 * Fonction permettant de recupérer dans async storage une valeur unique
 */
export const getStoreData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw Error(`AsyncStorage Error: get value in key: ${key}`);
  }
};

/**
 * Action permettant de changer le loading
 */
export const setNoTask = action(calendarStore, "setNoTask", (store, noTask) => {
  store.setKey("noTask", noTask);
});

/**
 * Action permettant d'ajouter les data du current day dispay
 */
export const setCurrentDay = action(
  calendarStore,
  "setCurrentDay",
  (store, currentDay) => {
    store.setKey("currentDay", currentDay);
  }
);

/**
 * Fonction permettant de creer les carte par jour
 */
export const createDayBoard = action(
  calendarStore,
  "createDayBoard",
  async (store) => {
    const { tasksList, day } = store.get();

    tasksList.filter((el) => {
      if (moment.utc(el.day).format("YYYY-MM-DD") == day) {
        setCurrentDay(el);
      }
    });
  }
);
