import Latex from "react-latex";
import React from "react";
import { Variable } from "./Styled";

export const Tex = (x: { children: string; bigFont?: boolean }) => {
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
      <Tex bigFont={x.bigFont}>{x.children}</Tex>
    </Variable>
  );
};
