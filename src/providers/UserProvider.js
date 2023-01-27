import apiManager from "./apiManager";

export const signup = async (email, username, password) => {
  try {
    const response = await apiManager.post("/users/signup", {
      email: email,
      username: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.log("Log userprovider =", error.response.data);
    throw Error(error.response.data);
  }
};

export const get_token = async (email, password) => {
  try {
    const response = await apiManager.post("/users/token", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("err get_token", error.response.data);
    throw Error(error.error.response.data);
  }
};

export const get_user = async (userToken) => {
  try {
    const response = await apiManager.get("/users/me", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const update_user = async (userToken, id, newUser) => {
  try {
    const response = await apiManager.put(
      `/users/${id}`,
      { ...newUser },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const delete_user = async (userToken, id) => {
  try {
    const response = await apiManager.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

