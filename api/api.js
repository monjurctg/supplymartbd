import axios from "axios";
import url from "../utils/url";

export const adminSendOtp = (data, afterAsync) => {
  axios
    .post(url + `/user/login-register`, data)
    .then((res) => {
      // console.log("res", res.data)
      // debugger;
      console.log(res?.data.message);
      afterAsync(true);
    })
    .catch((err) => {
      console.log(err.response);
      // debugger;

      afterAsync(false);
    });
};

export const getProfile = (setData) => {
  axios
    .get(url + `/user/profile`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => { });
};
export const getWishlists = (setData) => {
  axios
    .get(url + `/user/wishlist`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => { });
};
export const getCustomerOrders = (filter, setData) => {
  axios
    .get(url + `/user/orders`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => { });
};
export const updateProfile = (data, afterAsync) => {
  axios
    .post(url + `/user/update-profile`, data)
    .then((res) => {
      afterAsync(true);
    })
    .catch((err) => {
      afterAsync(false);
    });
};

export const getProductByMore = (setData, page) => {
  let pageNum = typeof page === "number" ? page : 1;
  let get = `${url}/product/all?page=${pageNum}`;
  axios
    .get(get)
    .then((res) => {
      console.log('res', res)
      if (res.data && res.data && Array.isArray(res.data.data)) {
        setData(res.data);
      }
    })
    .catch((err) => {
      setData(null);
    });
};

export const addToCart = (data, afterAsync) => {
  axios
    .post(url + `/user/carts `, data)
    .then((res) => {
      afterAsync(true);
    })
    .catch((err) => {
      afterAsync(false);
    });
};
export const addToWishlist = (data, afterAsync) => {
  axios
    .post(url + `/user/wishlist`, data)
    .then((res) => {
      afterAsync(true);
    })
    .catch((err) => {
      afterAsync(false);
    });
};
