import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, notification, Typography } from "antd";
import { PhoneOutlined, BarcodeOutlined } from "@ant-design/icons";
import { adminSendOtp } from "../api/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import axios from "axios";
import { useRouter } from "next/router";

const { Text } = Typography;

export default function Login({ setVisible }) {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function processNumber(num) {
    // Step 1: Convert int to string and remove all zeros


    // Step 2: Multiply the result by 11
    let multiplied = num * 11;

    // Step 3: Reverse the result twice (which effectively does nothing)
    let reversedTwice = multiplied.toString().split('').reverse().join('') // Skipping reverse since it cancels itself out

    // Step 4: Convert the final result to Base64
    let base64Result = btoa(reversedTwice); // Convert to Base64

    return base64Result;
  }

  const onFinish = async (values) => {
    let { phone, otp } = values;
    if (!otpSent) {
      setLoading(true);

      console.log('processNumber()', processNumber(phone))
      // debugger;
      adminSendOtp(
        { phone: phone, token: processNumber(phone) || "OTE4NjMyMDAzNDE=" },
        afterAsync
      );
      // afterAsync(false);
      // }
    } else {
      if (phone && otp) {
        setLoading(true);
        try {
          let data = { phone: phone, otp: otp }
          // let enc = makeid(7) + Buffer.from(data).toString("base64");
          const authRes = await axios.post("/api/auth",
            data
          );
          // console.log('authRes', authRes)
          loginAfterFunction(true);
        } catch (error) {
          loginAfterFunction(false);
        }
      }
    }
  };

  const afterAsync = (result) => {
    setLoading(false);
    // console.log("result", result)
    // debugger;
    if (result && !otpSent) {
      setOtpSent(true);
    } else {
      openNotificationWithIcon(
        "error",
        "Failed to send otp",
        "Please try again with a valid phone number."
      );
    }
  };
  const loginAfterFunction = (result) => {
    setLoading(false);
    if (setVisible) {
      setVisible(false);
    }
    if (!result) {
      setLoading(false);
      openNotificationWithIcon(
        "error",
        "Failed to login",
        "Sms verification failed"
      );
    } else {
      setLoading(false);
      window.location.href = "/";
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        ></div>
        <p>WELCOME TO Supplymartbd</p>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined style={{ marginRight: "0.5rem" }} />}
              placeholder="Phone"
              size="large"
            />
          </Form.Item>
          {otpSent && (
            <Form.Item
              label="OTP Code"
              name="otp"
              style={otpSent ? { height: "auto" } : { height: "0px" }}
              rules={[
                {
                  required: true,
                  message: "Please insert OTP!",
                },
              ]}
            >
              <Input
                prefix={<BarcodeOutlined style={{ marginRight: "0.5rem" }} />}
                type="number"
                placeholder="OTP Code"
                size="large"
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              style={{ width: "100%" }}
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              {otpSent ? "Confirm Submission" : "Send Verification"}
            </Button>
          </Form.Item>
        </Form>
        <Text
          type="error"
          style={{ fontSize: "12px", cursor: "pointer" }}
          onClick={() => setOtpSent(true)}
        >
          Already has an OTP ? Click Here
        </Text>
      </div>
    </div>
  );
}
