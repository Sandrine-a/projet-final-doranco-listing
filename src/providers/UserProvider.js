import apiManager from "./apiManager";

export const signup = async (email, username, password) => {
  try {
    const response = await apiManager.post("/users/signup", {
      email: email,
      username: username,
      password: password,
    });
    console.log(
      "response.data, response.status ====",
      response.data,
      response.status
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    throw Error(error);
  }
};

export const get_token = async (email, password) => {
  console.log(email, password);
  try {
    const response = await apiManager.post("/users/token", {
      email: email,
      password: password,
    });
    console.log(
      "response.data, response.status ====",
      response.data,
      response.status
    );
    return response.data;
  } catch (error) {
    console.log(error);
    // console.log(error);
    throw Error(error);
  }
};

export const get_user = async (userToken) => {
  try {
    const response = await apiManager.get(
      "/users/me",
      {
        // withCredentials: "true",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(
      "response.data, response.status ====",
      response.data,
      response.status
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    throw Error(error);
  }
};
