import { Card, Skeleton } from "antd";
import React from "react";

export default function ProductSkeleton() {
  return (
    <Card bodyStyle={{ padding: "0.75rem" }}>
      <div style={{ overflow: "hidden" }}>
        <Skeleton.Input
          style={{ width: 300, height: 240 }}
          active={true}
          size={"large"}
        />
        <Skeleton.Input
          style={{ width: 300, marginTop: "1rem", height: 24 }}
          active={true}
          size={"large"}
        />
        <Skeleton.Input
          style={{ width: 60, marginTop: "0.5rem", height: 24 }}
          active={true}
          size={"large"}
        />
      </div>
    </Card>
  );
}
