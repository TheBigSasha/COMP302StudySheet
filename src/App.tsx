import React, { useState } from "react";
import "./App.css";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import {
    BasicSyntaxTopic,
    ChurchTopic,
    CodeExamples,
    CoinSort,
    CPSTopic,
    CurryTopic,
    EvalImpl,
    EvalTopic,
    FreeVariables,
    HOFTopic,
    InferCode,
    InferenceRules,
    InfinteData,
    LazyTopic,
    ListHOFTopic,
    ListOperationsTopic,
    MathTopic,
    OCamlNotes,
    OptionalTopic,
    PartialEvaluation,
    ProofTopic,
    References,
    SubTypingTopic,
    TuplesTopic,
    TypeInferenceForFun,
    TypeInferenceTopic,
    TypesTopic, TypeVariables,
    Unification,
} from "./topics/Topics";
import { PageBase } from "./components/Styled";
import { Helmet } from "react-helmet";

function App() {
  const [printMode, setPrintMode] = useState<boolean>(true);

  const midterm = (
    <>
      <div className={"slimmerBoiColumn"}>
        {OCamlNotes}
        {ListHOFTopic}
        {BasicSyntaxTopic}
        {HOFTopic}
        {TuplesTopic}
        {TypeInferenceTopic}
        {ListOperationsTopic}
      </div>
      <div className={"slimBoiColumn"}>
        {MathTopic}
        {ProofTopic}
      </div>
      <div className={"slimBoiColumn"}>
        {CPSTopic}
        {CurryTopic}
      </div>
      {CodeExamples}
      {CoinSort}

      <div className={"slimmerBoiColumn"} style={{ height: "100%" }}>
        {OptionalTopic}
        {ChurchTopic}
        {TypesTopic}
      </div>
    </>
  );

  //TODO: Given an expressiom (Ocaml code or text), turn it into a proof with
  // the fraction looking thing
  /*
       fractiony-proof -> ocaml code
       ocaml code -> fractiony-proof
       explain fractiony-proof / code
     */

  // TODO: freevar example (substituions)
  const final = (
    <>
      <div className={"slimmerBoiColumn"}>
          {InferenceRules}
        {References}
        {InferCode}
      </div>
        <div className={"slimmerBoiColumn"}>
            {LazyTopic}
            {PartialEvaluation}


        </div>
            <div className={"slimBoiColumn"}>{Unification}</div>
      <div className={"slimBoiColumn"}>{FreeVariables}         {TypeInferenceForFun}
      </div>
      <div className={"slimBoiColumn"}>
          {EvalImpl}
          {TypeVariables}
      </div>

      <div className={"slimBoiColumn"}>
        {EvalTopic}
        {SubTypingTopic}
        {InfinteData}
      </div>
    </>
  );

  const Final = <PageBase printMode={printMode}>{final}</PageBase>;
  const Midterm = <PageBase printMode={printMode}>{midterm}</PageBase>;
  const Home = (
    <div>
      <h1>Welcome to the COMP302 Study sheet.</h1>
      <p>This sheet is of extreme quality and density.</p>
      <strong>
        This is a weirdly formatted page for a reason. The intended medium is
        PAPER. It is sized precisely so that it will print properly and preview
        as it will look on paper.
      </strong>
      <h2>Instructions</h2>
      <ol>
        <li>Click on final or midterm</li>
        <li>Print the webpage (letter size paper)</li>
        <li>Profit</li>
      </ol>
      <Link to="/midterm">Midterm</Link>
      <Link to="/final">Final</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>COMP302 Study Sheet</title>
        <meta
          name="description"
          content="COMP302 Study Sheet by TheBigSasha, with some insane density of information, syntax highlighting, and more!"
        />
      </Helmet>

      <nav
        style={{ position: "fixed", right: 0, top: 0 }}
        className={"card never-print"}
      >
        <h3>Controls</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/midterm">Midterm</Link>
          </li>
          <li>
            <Link to="/final">Final</Link>
          </li>
          <li>
            <button onClick={() => setPrintMode(!printMode)}>
              Print Mode: {printMode ? "On" : "Off"}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                const prev = printMode;
                setPrintMode(true);
                async function print() {
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  window.print();
                  setPrintMode(prev);
                }
                void print();
              }}
            >
              Print
            </button>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={Home}></Route>
        <Route path="/midterm" element={Midterm}></Route>
        <Route path="/final" element={Final}></Route>
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
