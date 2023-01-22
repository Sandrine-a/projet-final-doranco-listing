import apiManager from "./apiManager";

export const get_all_tasks = async (usertoken) => {
  try {
    const response = await apiManager.get("/tasks", {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    });
    // console.log("response.data, response.status ==", response.data, response.status);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};

export const create_task = async (usertoken, task) => {
  console.log("create :::", task);
  try {
    const response = await apiManager.post("/tasks", task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    });
    console.log(
      "response.data, response.status ==",
      response.data,
      response.status
    );
    return response.data;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};

export const delete_task = async (userToken, id) => {
  try {
    const response = await apiManager.delete(`/tasks/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(
      "response.data, response.status ==",
      response.data,
      response.status
    );
    return response;
  } catch (error) {
    console.log("Error", error);
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

//   async get_all_tasks(userId) {
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
