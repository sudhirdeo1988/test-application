import { jwtDecode } from "jwt-decode";
import { userTypes } from "../../Utilities/user";
import { find as _find, isEmpty as _isEmpty } from "lodash-es";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(credentials),
    // });
    // if (!response.ok) throw new Error("Invalid credentials");
    // const data = await response.json();
    // const user = jwtDecode(data.token);
    // dispatch({
    //   type: "LOGIN_SUCCESS",
    //   payload: { token: data.token, user },
    // });
    // localStorage.setItem("token", data.token);

    const foundUser =
      _find(
        userTypes,
        (user) =>
          credentials.username === user.userName &&
          credentials.password === user.password
      ) || {};
    if (foundUser && !_isEmpty(foundUser)) {
      // Create a static user object with a role
      const { password, ...rest } = foundUser;
      const user = rest;

      // Simulate a JWT token (for demonstration purposes)
      const token = "static.jwt.token";

      // Store user and token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user },
      });
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};

export const onLogOutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
  window.location.reload();
};
