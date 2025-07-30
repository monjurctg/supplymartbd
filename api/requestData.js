import Router from "next/router";
import url from "../utils/url";
import axios from "axios";
import {
  getCookie,
  getCookieFromBrowser,
  removeCookie,
} from "../utils/cookiesHandler";

export async function requestData(reqAuth, method, path, data) {
  // let time = new Date().toISOString();
  // let randomLength = randomInteger(5, 9);
  // let base64 = Buffer.from(time.toString()).toString("base64");
  // let secret = randomLength + makeid(randomLength) + base64;
  // console.log(secret);
  // let length = parseInt(secret.charAt(0)) + 1;
  // let b64 = secret.substring(length);
  // let timeStamp = Buffer.from(b64, "base64").toString("ascii");
  // console.log(timeStamp + "from end");
  // //let diff = moment.unix(timeStamp).diff(moment().unix(), "seconds");
  // let diff = timeStamp - moment().unix();
  // console.log(diff);
  try {
    const token = getCookieFromBrowser("site_jwt");
    const resp = await axios({
      method: method,
      url: url + path,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
        Referer: "https://www.alibaba.com/",

      },
    });
    return resp.data;
  } catch (error) {
    if (error && error.response && error.response.status === 401 && reqAuth) {
      removeCookie("site_jwt");
      Router.replace("/login");
      return null;
    } else {
      return null;
    }
  }
}
