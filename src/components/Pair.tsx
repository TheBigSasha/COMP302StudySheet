import React from "react";

export const Pair = ({
  item1,
  children,
}: {
  item1: React.ReactNode;
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


export const ListPairItem = ({
    item1,
    item2
}: {item1: React.ReactNode, item2: React.ReactNode}) => {
    return (
      <li>
        <Pair item1={item1}>{item2}</Pair>
      </li>
    )
}