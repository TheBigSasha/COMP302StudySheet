import Latex from "react-latex";
import React from "react";
import {Variable} from "./Styled";

export const Ltx = (x: { children: string, bigFont?: boolean }) => {
  return (
    <span style={{ fontSize: x.bigFont ? 12 : 6 }}>
      <Latex>{`$${x.children}$`}</Latex>
    </span>
  );
};


export const LtxVariable = (x: { children: string, bigFont?: boolean }) => {
    return (
        <Variable><Ltx bigFont={x.bigFont}>{x.children}</Ltx></Variable>
    )
}