import { Typography } from "antd";
import React from "react";

export default function Price({
  currency,
  price,
  type,
  textStyle,
  containerStyle,
}) {
  let mCurrency = currency ? currency : "৳";
  let mType = type ? type : "danger";
  let mTextStyle = textStyle ? textStyle : {};
  let mContainerStyle = containerStyle ? containerStyle : {};
  return (
    <div style={mContainerStyle}>
      <Typography.Text type={mType} style={mTextStyle}>
        {price ? mCurrency + " " + price : 0}
      </Typography.Text>
    </div>
  );
}
