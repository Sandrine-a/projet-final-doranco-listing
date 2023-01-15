import { action, map } from "nanostores";
import moment from "moment";
import "moment/locale/fr";

export const calendarStore = map({
  taskId: "",
  title: "",
  content: "",
  taskColor: {},
  day: moment(new Date()).format("YYYY-MM-DD"),
  time: "",
  tasksList: [],
  dayFilteredList: [], // SI NON UTILISE A SUPPRIMER //
  month: moment(new Date()).format("MM"),
});

// Nous pouvons récupérer le contenu du store :
// const title = calendarStore.get().title;
// const content = calendarStore.get().content;
// const color = calendarStore.get().color;
// const calendarState = calendarStore.get(); // Je récupére tout l'objet

// Pour modifier un élément de mon objet :
// calendarStore.setKey("title", title);
// calendarStore.setKey("content", content);
// calendarStore.setKey("color", color);

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
  // console.log("L'HEURE ==", time);
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
    taskId: Math.round(Math.random() * 1000), // A CHANGER AVEC BACK //
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
export const deletTask = action(
  calendarStore,
  "deletTask",
  async (store, currentTaskId) => {
    //Recuperation des tasks
    const { title, content, taskColor, day, time, tasksList, taskId } =
      store.get();
    console.log("pour", currentTaskId);
    console.log(tasksList);

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
