import axios from "axios";
import url from "../utils/url";

export const getCount = () => (dispatch) => {
  axios
    .get(url + "user/counts")
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        dispatch(setCount(res.data));
      }
    })
    .catch((err) => {});
};

export const setCount = (isAuthenticated) => {
  return {
    type: "SET_COUNT",
    payload: isAuthenticated,
  };
};
