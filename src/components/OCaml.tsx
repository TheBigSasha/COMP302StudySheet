import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import React from "react";

export const customStyle = {
  margin: 0,
  padding: 0,
  fontSize: 6,
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.7)",
};

export const OCaml = ({ code }: { code: string }) => {
  return (
    <SyntaxHighlighter language="ocaml" customStyle={customStyle}>
      {code}
    </SyntaxHighlighter>
  );
};
