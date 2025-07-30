// let data = null;
// let key = window.location.search.substring(1);
// let urlDecoded = atob(key);
// try {
//   data = JSON.parse(urlDecoded);
// } catch (error) {}
// if (data) {

//   $("#bKash_button").click();
// }

function run(data) {
  if (data) {
    var paymentID = "";
    let url = `http://192.168.0.129:3031/`;
    bKash.init({
      paymentMode: "checkout", //fixed value ‘checkout’
      paymentRequest: {
        amount: 1000,
        intent: "sale",
      },
      createRequest: function (request) {
        axios
          .post(
            url + "customer/pay",
            {
              payment_method: "bkash",
              orders: ["630b32a0ba42cd861dff1679"],
            },
            {
              headers: {
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6ImN1c3RvbWVyIiwiYXV0aElkIjoiNjMxNDUzYmRmZmI1MjlmYzFkYWFlNjZlIiwiY3VzdG9tZXJJZCI6IjYyNWU3OGI1MmVmYjYyYzllODI0YjJmYyIsImN1c3RvbWVyTmFtZSI6IkFoc2FuIEhhYmliIiwiY3VzdG9tZXJQaG9uZSI6IjAxNjE0MzkwNzE3IiwiaWF0IjoxNjYyMjc2NTQxLCJleHAiOjE2OTM4MzQxNDF9.reOYTYECQAFlOXn9c5OCB_3VoHjnkuP26mmPuY6sTIc"}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data && res.data.res) {
              paymentID = res.data.res.paymentID;
              bKash.create().onSuccess(res.data.res);
            } else {
              bKash.create().onError();
            }
          })
          .catch((err) => {
            console.log(err.response);
            bKash.create().onError();
          });
      },
      executeRequestOnAuthorization: function () {
        axios
          .post(
            `https://api.wholesalecart.com/v2/user/bkash/execute-payment`,
            {
              paymentId: paymentID,
            },
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
          )
          .then((res) => {
            let data = res.data;
            if (data && data.paymentID != null) {
              let base64data = btoa(JSON.stringify({ from: "bkash", id: 0 }));
              window.location.href =
                "https://wholesalecart.com" + "/pay/confirmation/" + base64data;
            } else {
              let base64data = btoa(JSON.stringify({ from: "bkash", id: 2 }));
              bKash.execute().onError();
              window.location.href =
                "https://wholesalecart.com" + "/pay/confirmation/" + base64data;
            }
          })
          .catch((err) => {
            let base64data = btoa(JSON.stringify({ from: "bkash", id: 2 }));
            console.log(err.response);
            bKash.execute().onError();
            window.location.href =
              "https://wholesalecart.com" + "/pay/confirmation/" + base64data;
          });
      },
      onClose: function () {
        window.location.href = "https://wholesalecart.com/account/orders";
      },
    });
    $("#bKash_button").click();
  }
}
