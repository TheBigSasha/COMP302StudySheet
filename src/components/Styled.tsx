import styled from "styled-components";
import React from "react";

export const MarginText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 8px;
  text-align: left;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
`;

const MarginTextBottom = styled(MarginText)`
  top: auto;
  bottom: 0;
  right: 0;
  left: auto;
`;

const MarginTextTR = styled(MarginText)`
    top: 0;
    right: 0;
    left: auto;
    bottom: auto;
`;

const MarginTextBL = styled(MarginText)`
    top: auto;
    right: auto;
    left: 0;
    bottom: 0;
`;


export const Divider = styled.hr`
  border: 0.5px solid rgba(0, 0, 0, 0.4);
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const DotDivider = styled(Divider)`
  border: 0.5px dotted rgba(0, 0, 0, 0.4);
`;

// inline variable name, inline code
export const Variable = styled.code`
  background: rgba(0, 0, 0, 0.1);
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block !important;
`;

export const PageBase: React.FC<
  React.PropsWithChildren<{ printMode?: boolean }>
> = ({ children, printMode }) => (
  <body className={printMode ? "printmode" : "noPrint"}>
    <MarginText className={"printonly"}>
      A monad is a monoid in the category of endofunctors | CPS can be expressed
      as a monad | Monads are useful for handling side effects
    </MarginText>
    {children}
    <MarginTextBottom className={"printonly"}>
      Made with ❤️ by sashaphoto.ca
    </MarginTextBottom>
    <MarginTextBL className={"printonly"}>🐫 OCaml more like NO CAMEL ❌</MarginTextBL>
    <MarginTextTR className={"printonly"}>Soruce: github/TheBigSasha/COMP302StudySheet</MarginTextTR>
  </body>
);

PageBase.defaultProps = {
  printMode: true,
};
