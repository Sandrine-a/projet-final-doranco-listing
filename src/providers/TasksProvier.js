import ApiManager from "./ApiManager";

export const getAllTAsks = async (userId) => {
  try {
    const response = await ApiManager("/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDA5MTk1NCwiZXhwIjoxNjc0MTc4MzU0fQ.B_4Q5nfMl3MkEovIagBykxxX4OKXkZ-mmv6ztLyp4QA`
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

//   async getAllTAsks(userId) {
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
