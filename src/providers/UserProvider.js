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
    console.log(error);
    throw Error(error);
  }
};

export const get_token = async (email, password) => {
  console.log("get_token :", email, password);
  try {
    const response = await apiManager.post("/users/token", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const get_user = async (userToken) => {
  console.log("here");
  try {
    const response = await apiManager.get(
      "/users/me",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
