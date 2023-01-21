import apiManager from "./apiManager";

export const getAllTasks = async (token) => {
  try {
    const response = await apiManager("/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// export default class TasksProvider {
//   constructor() {
//     this.apiUrl = TASKS_API_ENDPOINT
//     this.headers = {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     };
//   }

//   async getAllTasks(userId) {
//     // axios.get(
//     //   `${this.apiUrl}/tasks`,
//     //   {},
//     //   {
//     //     headers: this.headers,
//     //   }
//     // )
//     // .then((response) => {
//     //   return response
//     // })
//     // .catch((error) => {reject(error)})

//     try {
//       const response = await axios.get(
//         `${this.apiUrl}/tasks`,
//         {},
//         {
//           headers: this.headers,
//         }
//       );
//       return response.data
//       // console.log(response.status);
//     } catch (error) {
//       console.log(error);
//       // if (axios.isCancel(error)) console.info("login cancelled");
//       // console.error(error);

//       // throw Error("Identifiant ou mot de passe incorrect");
//     }
//   }
// }
