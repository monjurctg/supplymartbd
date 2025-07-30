import React from "react";
import { Layout } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useSelector } from "react-redux";
import ProductLoading from "../components/Skeletons/ProductLoading";
const { Content } = Layout;

export default function MainContent(props) {
  let margin = {
    background: "#f2f2f2",
  };

  const info = useSelector((state) => state.products.info);

  return (
    <Content style={margin} className="mainContent">
      <div
        className="site-layout-background"
        style={{ minHeight: "calc(100vh - 600px)" }}
      >
        {info ? (
          <div>
            <ProductLoading preProduct={info} />
          </div>
        ) : (
          props.children
        )}
      </div>
    </Content>
  );
}
