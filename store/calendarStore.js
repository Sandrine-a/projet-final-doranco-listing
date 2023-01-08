import { action, map } from "nanostores";

export const calendarStore = map({
  taskId: "",
  title: "",
  content: "",
  taskColor: {},
  date: new Date(),
  tasksList: [],
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
export const setDate = action(
  calendarStore,
  "setDate",
  (store, date) => {
    console.log("la date ==", date);
    store.setKey("date", date);
  }
);

/**
 * Action permettant d'ajouter à la liste
 */
export const addNewTask = action(calendarStore, "addNewTask", async (store) => {
  //Recuperation des tasks
  const { title, content, taskColor, date, tasksList } = store.get();
  // console.log(title, content, taskColor);

  //Creation du new task
  const task = {
    taskId: "1",
    title: title,
    content: content,
    taskColor: taskColor,
    date: date,
  };
  //Creation du nouveau tableau contenant la nouvelle task
  const newTask = [task, ...tasksList];
  //MAJ de la lsite des taches
  store.setKey("tasksList", newTask);

  //Vidage des champs du store
  // store.setKey("tasksList", '')
  store.setKey("title", "");
  store.setKey("content", "");
  store.setKey("taskColor", "");
  store.setKey("date", "");
});
