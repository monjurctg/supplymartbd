import axios from "axios";
import { getCookieFromBrowser } from "../utils/cookiesHandler";
import url from "../utils/url";

export const getUsersExtra = () => (dispatch) => {
  const token = getCookieFromBrowser("site_jwt");
  if (token) {
    axios
      .get(url + "/user/counts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "SET_EXTRA",
          payload: res?.data ? res.data : {},
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_EXTRA",
          payload: {},
        });
      });
  } else {
    dispatch({
      type: "SET_EXTRA",
      payload: {},
    });
  }
};
export const getUserProfileAction = () => (dispatch) => {
  const token = getCookieFromBrowser("site_jwt");
  if (token) {
    axios
      .get(url + "/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_USER_PROFILE",
          payload: res.data ? res.data?.data : {},
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_USER_PROFILE",
          payload: null,
        });
      });
  } else {
    dispatch({
      type: "SET_USER_PROFILE",
      payload: null,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("zz");
  localStorage.removeItem("pr");
  dispatch(setAdmin(false));
};

export const setUser = (isAuthenticated) => {
  return {
    type: "SET_USER_AUTH",
    payload: isAuthenticated,
  };
};
export const setUserProfile = (info) => {
  return {
    type: "SET_USER_PROFILE",
    payload: info,
  };
};
