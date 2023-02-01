import { action, map } from "nanostores";

/**
 * @module bottomTabStore -
 * @description  Persistance des données à travers l'app.
 * Permet  de stocker et changer toutes les données
 * inherentes à l'etat de la navigation par la bottomTab
 *
 */

/**
 * Initialisation du store avec initialisation par defauts et valeurs
 */
export const bottomTabStore = map({
  active: false,
  viewActive: "",
  onlyCloseButton: false,
  view: "",
});

/**
 * Action permettant de changer l'active
 */
export const setViewActive = action(
  bottomTabStore,
  "setViewActive",
  (store, viewActive) => {
    store.setKey("viewActive", viewActive);
  }
);

/**
 * Action permettant de changer l'active 
 */
export const setActive = action(
  bottomTabStore,
  "setActive",
  (store, active) => {
    store.setKey("active", active);
  }
);

/**
 * Action permettant de l'affichage des boutons
 */
export const setOnlyCloseButton = action(
  bottomTabStore,
  "setOnlyCloseButton",
  (store, onlyCloseButton) => {
    store.setKey("onlyCloseButton", onlyCloseButton);
  }
);

/**
 * Action permettant de changer la view
 */
export const setView = action(bottomTabStore, "setView", (store, view) => {
  store.setKey("view", view);
});
