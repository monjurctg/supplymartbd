// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import url from "../../utils/url";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const id = req.body?.undefined;
      let dataString = id
        ? Buffer.from(id.slice(7), "base64").toString("ascii")
        : null;
      let data = JSON.parse(dataString);

      let response = await axios.post(url + "/user/verify-otp", req.body,
      );
      console.log('datassresponse', response)

      let token = response?.data?.success?.token;
      if (token) {
        const serialized = serialize("site_jwt", token, {
          // httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          secure: true,
        });

        res.setHeader("Set-Cookie", serialized);
        res.status(200).send("undefined");
      } else {
        res.status(405).send("Method Not Allowed");
      }
    } catch (error) {
      console.log(error.response);
      res.status(405).send("Method Not Allowed");
    }
  } else if (req.method === "PUT") {
    try {
      let id = req.body?.undefined;
      let phone = id
        ? Buffer.from(id.slice(7), "base64").toString("ascii")
        : null;
      if (phone) {
        // let response = await axios.post(
        //   url + "/customer/chiching-fuck",
        //   { phone: phone },
        //   {
        //     headers: {
        //       azobit: 404,
        //     },
        //   }
        // );
        // res.status(200).send("undefined");

        console.log(req.headers);
      }
    } catch (error) {
      console.log(error);
      res.status(405).send("Method Not Allowed1");
    }
  } else {
    res.status(405).send("Method Not Allowed1");
  }
}
