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
    throw Error(error);
  }
};

export const create_task = async (usertoken, task) => {
  try {
    const response = await apiManager.post("/tasks", task, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw Error(error);
  }
};

export const delete_task = async (userToken, id) => {
  try {
    const response = await apiManager.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error", error);
    throw Error(error);
  }
};

export const update_task = async (userToken, id, newTask) => {
  try {
    const response = await apiManager.put(`/tasks/${id}`, newTask, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error", error);
    throw Error(error);
  }
};

