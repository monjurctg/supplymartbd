/* eslint-disable @next/next/no-img-element */
import { Card, Col, Row, Tag } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import React from "react";
import AccountMenu from "../../components/AccountMenu";
import withAuth from "../../config/withAuth";

function Account() {
  const screens = useBreakpoint();
  return (
    <div>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        {screens.xs && (
          <Col xs={{ span: 24 }} style={{ backgroundColor: "#fff" }}>
            <AccountMenu />
          </Col>
        )}
        <Col
          xs={{ span: 24 }}
          style={screens.xs ? { marginTop: "1rem" } : { marginTop: "0.5rem" }}
        >
          <Row gutter={[8, 8]} style={{ margin: 0 }}>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              <Card style={{ height: "100%" }}>
                <img
                  src={require("../../assets/banner/popup2.jpg").default.src}
                  style={{
                    width: "100%",
                  }}
                  alt=""
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Account);
