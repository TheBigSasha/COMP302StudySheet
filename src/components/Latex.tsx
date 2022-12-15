import Latex from "react-latex";
import React from "react";
import { Variable } from "./Styled";

export const Ltx = (x: { children: string; bigFont?: boolean }) => {
  return (
    <span
      style={{ fontSize: x.bigFont ? 10 : 6, marginBottom: x.bigFont ? 3 : 0 }}
    >
      <Latex>{`$${x.children}$`}</Latex>
    </span>
  );
};

export const LtxVariable = (x: { children: string; bigFont?: boolean }) => {
  return (
    <Variable>
      <Ltx bigFont={x.bigFont}>{x.children}</Ltx>
    </Variable>
  );
};
