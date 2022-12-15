import Latex from "react-latex";
import React from "react";

export const Ltx = (x: { children: string }) => {
  return (
    <span style={{ fontSize: 12 }}>
      <Latex>{`$${x.children}$`}</Latex>
    </span>
  );
};
