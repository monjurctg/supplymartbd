import { Card } from "antd";
import React from "react";
import styles from "../styles/Home.module.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function PlatformSlider() {
  const screens = useBreakpoint();
  return (
    <Card
      bodyStyle={{ padding: screens.xs ? "0.5rem" : "1rem" }}
      style={{ marginTop: "0.5rem" }}
      title="SHOPPING FROM"
      size="small"
    >
      <div className="responsiveOverflow">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className={styles.platformCard}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                backgroundColor: "#DF2E05",
                color: "white",
                height: 80,
                display: "flex",
                alignItems: "center",
                minWidth: 200,
                justifyContent: "center",
              }}
            >
              <span
                className="flexCenter"
                style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
              >
                Aliexpress & Taobao
              </span>
            </Card>
          </div>
          <div className={styles.platformCard}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                backgroundColor: "#232F3E",
                color: "white",
                height: 80,
                display: "flex",
                alignItems: "center",
                minWidth: 200,
                justifyContent: "center",
              }}
            >
              <span
                className="flexCenter"
                style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
              >
                Amazon.AE
              </span>
            </Card>
          </div>
          <div className={styles.platformCard}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                backgroundColor: "#000",
                color: "white",
                height: 80,
                display: "flex",
                alignItems: "center",
                minWidth: 200,
                justifyContent: "center",
              }}
            >
              <span
                className="flexCenter"
                style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
              >
                Amazon India
              </span>
            </Card>
          </div>
          <div className={styles.platformCard} style={{ marginRight: 0 }}>
            <Card
              bordered={false}
              style={{
                height: "100%",
                backgroundColor: "#111822",
                color: "white",
                height: 80,
                display: "flex",
                alignItems: "center",
                minWidth: 200,
                justifyContent: "center",
              }}
            >
              <span
                className="flexCenter"
                style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
              >
                Amazon USA
              </span>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}
