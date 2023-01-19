import { action, map } from "nanostores";
import moment from "moment";
import "moment/locale/fr";
import TasksProvider, { getAllTAsks } from "../providers/TasksProvier";
import { TASKS_API_ENDPOINT } from "../settings";

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
});

// const tasksProvider = new TasksProvider();

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
  console.log("L'HEURE ==", time);
  store.setKey("time", time);
});

/**
 * Action permettant d'ajouter à la liste
 */
export const addNewTask = action(calendarStore, "addNewTask", async (store) => {
  //Recuperation des tasks
  const { title, content, taskColor, day, time, tasksList } = store.get();

  //Creation du new task
  const task = {
    taskId: id,
    title: title,
    content: content,
    taskColor: taskColor,
    day: day,
    time: time,
  };
  //Creation du nouveau tableau contenant la nouvelle task
  const newTask = [task, ...tasksList];
  //MAJ de la lsite des taches
  store.setKey("tasksList", newTask);

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
  async (store, currentTaskId) => {
    //Recuperation des tasks
    const { title, content, taskColor, day, time, tasksList, taskId } =
      store.get();
    console.log("pour", currentTaskId);
    // console.log(tasksList);

    // ON créé un nouveau tableaux contenant les taches moins la tache
    // à supprimer
    const newTasksList = tasksList.filter(
      (task) => task.taskId !== currentTaskId
    );

    // const newTasksList = tasksList.filter(
    //   (task) => task.taskId !== currentTaskId
    // );

    console.log("newTasksList = ", newTasksList.length);

    // On met à jour la liste en supprimant la tache
    // avec la currentTaskId
    store.setKey("tasksList", newTasksList);
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
 * Action permettant de changer le mois
 */
export const setMonth = action(calendarStore, "setMonth", (store, month) => {
  store.setKey("month", month);
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

    // On se connécte à l'application en utilisant le async storage
    // const user = await loginToFirebaseWithAsyncStorage()
    // // On test l'éxistence d'un user
    // if (!user) {
    //   // On arréte le chargement
    //   store.setKey('loading', false)

    //   return
    // }

    // try {
    //   const response = await tasksProvider.getAllTAsks();
    //   if (response) {
    //     // console.log("yesss", response.data);
    //     store.setKey("tasksList", response.data);
    //     return;
    //   } else {
    //     throw new Error("Failed to fetch tasks");
    //   }
    // } catch (e) {
    //   console.log("error!!", e);
    // }

    const result = await getAllTAsks() 
    if(result) {
      console.log("yes data", result);
      store.setKey("tasksList", result.data);
    }
    // On indique que l'utilisateur est connécté
    store.setKey("loading", false);
    // store.setKey('user', user)
  }
);
