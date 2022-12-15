import React from "react";

export const Pair = ({
  item1,
  children,
}: {
  item1: string;
  children: React.ReactNode;
}) => {
  return (
    <span className={"pair"}>
      <p style={{ textAlign: "left", width: "max-content", fontSize: "8px" }}>
        {item1}
      </p>
      <code style={{ textAlign: "right", width: "fit-content" }}>
        {children}
      </code>
    </span>
  );
};
