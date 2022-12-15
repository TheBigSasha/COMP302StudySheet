import { TopicCard } from "../TopicCard";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import React from "react";
import {ListPairItem, Pair} from "../components/Pair";
import { customStyle, OCaml } from "../components/OCaml";
import { Divider, DotDivider, Variable } from "../components/Styled";
import {Ltx, LtxVariable} from "../components/Latex";

export const OptionalTopic = (
  <TopicCard title={"Optional"} color={"rgba(0,255,255,0.25)"}>
    <ul>
      <li>
        <Pair item1={"Optional int 42"}>
          <OCaml code={`Some 42`}></OCaml>
        </Pair>
      </li>
      <li>
        <Pair item1={"Optional None"}>
          <OCaml code={`None`}></OCaml>
        </Pair>
      </li>
      <li>
        <Pair item1={"Optional.get()"}>
          <OCaml
            code={`let extract o =
  match o with
  | Some i -> string_of_int i
  | None -> "";;`}
          ></OCaml>
        </Pair>
      </li>
      <li>
        <Pair item1={"extract Some 42"}>42</Pair>
      </li>
      <li>
        <Pair item1={"extract None"}>None</Pair>
      </li>
      <li>
        <Pair item1={"t option"}>a type for every type t</Pair>
      </li>
      <li>
        <Pair item1={"None"}>a value of type 'a option</Pair>
      </li>
      <li>
        <Pair item1={"Some e "}>an expression of type t option if e : t</Pair>
      </li>
      <li>
        <Pair item1={"Some e "}>{`If e ==> v then Some e ==> Some v`}</Pair>
      </li>
    </ul>
  </TopicCard>
);

export const CodeExamples = (
  <TopicCard title={"Code Examples"} color={"rgba(255,128,0,0.25)"}>
    <h4>Conversion to CPS</h4>
    <span className={"twoCol"}>
      {" "}
      <caption>
        Consider function pow : {`int -> int -> int`} that computes nk
      </caption>
      <OCaml
        code={`let pow k n =
   if k = o then 1
   else n * pow (k -1) n`}
      />
    </span>
    <caption>Tail recursive Version</caption>
    <OCaml
      code={`
let is_even n = 
  n mod 2 = 0
  
let pow base exponent =
  if exponent < 0 then invalid_arg "exponent can not be negative" else
  let rec aux accumulator base = function
    | 0 -> accumulator
    | 1 -> base * accumulator
    | e when is_even e -> aux accumulator (base * base) (e / 2)
    | e -> aux (base * accumulator) (base * base) ((e - 1) / 2) in
  aux 1 base exponent
    `}
    />
    <h4>Vector Scale</h4>
    <OCaml
      code={`implement a scale : ‘a vector * (’a → ‘b) → ‘b vector 
let scale: 'a vector * ('a -> 'b) -> 'b vector = 
  fun (v, f) -> map f v;;`}
    />
    <h4>HOF Example</h4>
    <span className={"twoCol"}>
      <OCaml
        code={`let rec repeated (f,n) = 
if (n=0) then fun x → x 
 else x → f ((repeated (f,n-1) x)`}
      />
      <caption>
        takes a function f and a non-negative integer n as arg. and returns the
        function that implies f:n times
      </caption>
    </span>
    <h4>Find card in list</h4>
    <OCaml
      code={`(it is tail recursive since every single recursive call is returned)
(output type is card option)
let rec find_color (c: color) (l: card mylist): card option =  match l with
|Nil -> None
|Cons ( (col,v), l) ->
if col = c then Some (col, v)
(the color didn't matched)
else find_color c l (imidiately returned)`}
    ></OCaml>
    <h4>Head of list that doesn't exist</h4>
    <OCaml
      code={`let head (l: 'a mylist): 'a = match l with
|Cons (x, _) ->x
|Nil -> raise EmptyList`}
    />
    <h4>*** Code Example - rev / rev_tr</h4>
    <span className={"twoCol"}>
      <OCaml
        code={`(* naive *)
(* rev: 'a list -> 'a list *)
let rec rev l = match l with
\t| [] -> []
\t| x::l -> (rev l) @ [x];;
(* Define length *)
let rec length l = match l with
\t| [] -> 0
\t| h::t -> 1 + length t`}
      />
      <OCaml
        code={`(* tail recursive *)
(* rev': 'a list -> 'a list *)
let rev' l =
(* rev_tr: 'a list -> 'a list -> 'a list *)
\tlet rec rev_tr l acc = match l with
\t| [] -> асс
\t| h::t -> rev_tr t (h: :acc)
in
rev_tr 1 [];;`}
      />
    </span>
  </TopicCard>
);

export const CoinSort = (
  <TopicCard title={"Coin Sort"} color={"rgba(139,147,26,0.34)"}>
    <OCaml
      code={`(*list of coins, amount to make with those
    coins, return the sequence of coin added to the amount*)
let rec change (coins : int list) ( amt : int) : int list = 
  match coins with 
  | _ when amt = 0 -> [] (**we dont care what the amount of coin is ,
  ignore the coin *)(* - succes *)
  |  [] -> raise Change (*if we match all the coins *)  (*   failure  *) 
             if coin :: cs  -> (*if the coin is too big fo to the other coin *)
             (* make a recursive call witht he smaller amount *)
               if coin > amt then change cs amt else 
                 coin :: change (coin :: cs) (amt - coin)
                 (*amount decrease with the acoin*)
                   try 
                     coin :: change (coin :: cs) (amt = coin)
                   with 
                   | Change -> change cs amt (*if we raise the change exception
                   , we go back*)                                 
let change' coin amt : int list option = 
  try 
    Some (change coins amt)
  with 
  |Change -> None`}
    />
    <p>
      {" "}
      The change function is a recursive function that takes a list of coins and
      an amount to make with those coins. It returns the sequence of coins that
      add up to the amount.{" "}
    </p>
  </TopicCard>
);

export const TypeInferenceTopic = (
  <TopicCard title={"Type Inference"} color={"#4ae5a6"}>
    <ul>
      <li>
        <OCaml code={`3 / 0`} />
      </li>
      <li>
        <Pair item1={"Type"}>Int</Pair>
      </li>
      <li>
        <Pair item1={"Effect"}>DivByZero Error</Pair>
      </li>
    </ul>
    <ul>
      <li>
        <OCaml
          code={`let head_of_empty list =
\tlet head (x::t) = x in
\t\thead []`}
        />
      </li>
      <li>
        <Pair item1={"Type"}>
          ‘a list → ‘a{" "}
          <i>since we never return None, it will not be ‘a option</i>
        </Pair>
      </li>
      <li>
        <Pair item1={"Effect"}>
          No value; cannot decompose an empty list into head and tail
        </Pair>
      </li>
    </ul>
  </TopicCard>
);

export const MathTopic = (
  <TopicCard title={"Math"} color={"#ef6e6e"}>
    <caption>Derivative (numeric)</caption>
    <OCaml
      code={`let derivative fx =
\tlet dx = 0.001 in
\tfun x -> (fx (x+.dx) -. fx x) /. dx ;;`}
    />
    <caption>Derivative (symbolic)</caption>
    <OCaml
      code={`let rec diff (e : exp) : exp =
  match e with
  | Const f -> Const 0.0
  | Var -> Const 1.0
  | Plus (e1, e2) -> Plus (diff e1, diff e2)
  | Times (e1, e2) -> Plus (Times (diff e1, e2), Times (e1, diff e2))
  | Pow (e1, i) -> Times (Times
                (Const (float_of_int i), Pow (e1, i - 1)), diff e1)`}
    />
    <caption>Collect Variables</caption>
    <OCaml
      code={`let collect_variables (formula : formula) : Variable_set.t =
  let rec collect_variables_helper (formula : formula)
                        (acc : Variable_set.t) : Variable_set.t =
    match formula with
    | Variable v -> Variable_set.add v acc
    | Conjunction (f1, f2) -> collect_variables_helper f1
                            (collect_variables_helper f2 acc)
    | Disjunction (f1, f2) -> collect_variables_helper f1
                                (collect_variables_helper f2 acc)
    | Negation f -> collect_variables_helper f acc
  in
  collect_variables_helper formula Variable_set.empty`}
    />
  </TopicCard>
);

export const TypesTopic = (
  <TopicCard title={"Generic Types"} color={"rgba(98,231,191,0.3)"}>
    <p>The use of ‘ before a variable name denotes a generic type.</p>
    <SyntaxHighlighter language="ocaml" customStyle={customStyle}>
      {`map ('a -> 'b) -> 'a list -> 'b list`}
    </SyntaxHighlighter>
    <caption>{`Operators like ==, >, < are automatically polymorphic → always work when using generics`}</caption>
    <h4>Custom Types</h4>
    <OCaml code={`type fraction = { num : int; denom : int; }`} />
    <caption>
      {" "}
      Lower case is the variable name, uppercase is the type name.
    </caption>
    <OCaml
      code={`type number =
    Int of int | Float of float | Error`}
    />
    <caption> Without type/name, the items are an enum.</caption>
    <OCaml code={`type sign = Positive | Negative`} />
    <h4>Using Custom Types</h4>
    <OCaml
      code={`let sign_int n = 
    if n >= 0 then Positive else Negative;;`}
    />
  </TopicCard>
);

export const TuplesTopic = (
  <TopicCard title={"Tuples"} color={"rgba(234,255,1,0.29)"}>
    <OCaml
      code={`let minmax (a, b) : float * float =
  if a < b then (a, b) else (b, a)`}
    />
    <caption>Here (a,b) is a tuple of type float * float</caption>
  </TopicCard>
);

export const CurryTopic = (
  <TopicCard title={"Currying"} color={"rgba(150,231,98,0.3)"}>
    <caption>simple add function in OCaml which is CURRIED</caption>
    <OCaml
      code={`(* val add : int -> int -> int = <fun> *)
let add x:int y:int = x + y`}
    />
    <OCaml
      code={`let add = function (x : int) -> function (y : int) -> x + y`}
    />
    <caption>Here, the function is NOT curried.</caption>
    <OCaml
      code={`(* val add : (int * int) -> int = <fun> *)
let add (x:int, y:int) = x + y`}
    />
    <OCaml
      code={`(* val add : (int * int) -> int = <fun> *)
let add = fun (z : int * int) -> match z with (x, y) -> x + y`}
    />
    <ul>
      <li>
        <Pair item1={"!Curried"}>{`(int * int) → int`}</Pair>
      </li>
      <li>
        <Pair item1={"Curried"}>{`int → int → int`}</Pair>
      </li>
    </ul>
  </TopicCard>
);

export const ListOperationsTopic = (
  <TopicCard title={"List Operations"} color={"rgba(130,0,0,0.4)"}>
    <caption>
      Lists are comprehended with head and tail; first item and rest of list,
      deconstructed from a tuple.
    </caption>
    <ul>
      <li>
        <Pair item1={"Append item - @"}>
          <SyntaxHighlighter customStyle={customStyle} language="ocaml">
            {`# [1] @ [2; 3];;
- : int list = [1; 2; 3]`}
          </SyntaxHighlighter>
        </Pair>
        <Pair item1={"Head / Tail"}>
          <SyntaxHighlighter customStyle={customStyle} language="ocaml">
            {`let rec sum lst =
  match lst with
  | [] -> 0
  | h::t -> h + sum t`}
          </SyntaxHighlighter>
        </Pair>
        <Pair item1={"List Length"}>
          <SyntaxHighlighter customStyle={customStyle} language="ocaml">
            {`let rec length lst =
    match lst with
    | [] -> 0
    | h::t -> 1 + length t`}
          </SyntaxHighlighter>
        </Pair>
        <Pair item1={"Concat one item - ::"}>
          <SyntaxHighlighter customStyle={customStyle} language="ocaml">
            {`# 1 :: [2; 3];;
- : int list = [1; 2; 3]`}
          </SyntaxHighlighter>
        </Pair>
      </li>
    </ul>
  </TopicCard>
);
export const ListHOFTopic = (
  <TopicCard title={"List Operations HOF"} color="rgba(255,0,0,0.3)">
    <ul>
      <li>
        <Pair item1={"List.map"}>{`(’a −> ’b) −> ’a list −> ’b list`}</Pair>
      </li>
      <OCaml
        code={`let rec map f list =
match list with
 | [] -> []
 | h::t -> (f h) :: (map f t)`}
      />
      <li>
        <Pair item1={"List.length"}>{`’a list −> int`}</Pair>
      </li>
      <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
        {`let rec length list =
match list with
| [] -> 0
| _::t -> 1 + (length t)`}
      </SyntaxHighlighter>

      <li>
        <Pair
          item1={"List.fold_left"}
        >{`(’ a −> ’b −> ’b) −> ’a list −> ’b −> ’b`}</Pair>
      </li>
      <li>
        <Pair item1={"List.for_all"}>
          {`(’ a −> bool) −> ’a list −> bool`}{" "}
        </Pair>
      </li>
      <li>
        <Pair item1={"List.exists"}> {`(’ a −> bool) −> ’a list −> bool`}</Pair>
      </li>
      <li>
        <Pair item1={"List.rev"}> {`’a list −> ’a list`}</Pair>
      </li>
      <li>
        <Pair item1={"List.find_opt"}>
          {" "}
          {`(’ a −> bool) −> ’a list −> ’a option`}
        </Pair>
      </li>
      <li>
        <Pair item1={"List.filter"}>
          {" "}
          {`(’ a −> bool) −> ’a list −> ’a list`}
        </Pair>
      </li>
      <li>
        <Pair item1={"List.init"}>
          {" "}
          {`int −> (int −> ’a) −> ’a list (∗by index∗)`}
        </Pair>
      </li>
    </ul>
  </TopicCard>
);

export const ProofTopic = (
  <TopicCard title={"Proofs"} color="rgba(0,255,0,0.3)">
    <h4>Lemmas</h4>
    <ul>
      <li>
        <Pair item1={"Associativity"}>{`a + (b + c) = (a + b) + c`}</Pair>
      </li>
      <li>
        <Pair item1={"Commutativity"}>{`a + b = b + a`}</Pair>
      </li>
      <li>
        <Pair
          item1={"Function Associativity"}
        >{`Functions are left associative`}</Pair>
      </li>
    </ul>
    <h4>Proving Equivalence Via Induction</h4>
    <ul>
      <li>
        <Pair item1={"Base Case"}>{`P []`}</Pair>
      </li>
      <li>
        <Pair item1={"Inductive Step"}>{`P l -> P (h::l)`}</Pair>
      </li>
    </ul>
    <p>
      So let’s strengthen the claim we are making. Instead of showing that fact
      n = facti 1 n, we’ll try to show forall p, p * fact n = facti p n. That
      generalizes the k + 1 we were stuck on to an arbitrary quantity p.
    </p>
    <OCaml
      code={`let rec facti acc n =
  if n = 0 then acc else facti (acc * n) (n - 1)
let fact_tr n = facti 1 n
val facti : int -> int -> int = <fun>
val fact_tr : int -> int = <fun>
`}
    />
    <p>Claim: forall n, forall p . p * fact n = facti p n</p>
    <p>Proof: by induction on n.</p>
    <code> P(n) = forall p, p * fact n = facti p n </code>
    <p>Base case: n = 0 ; Show: forall p, p * fact 0 = facti p 0</p>
    <ul>
      <li>
        <Pair item1={`p * fact 0 = p`}>by evaluation and algebra</Pair>
      </li>
      <li>
        <Pair item1={`p = facti p 0`}>by evaluation</Pair>
      </li>
    </ul>
    <p>Inductive case: n = k + 1</p>
    <p>
      Show: <code>forall p, p * fact (k + 1) = facti p (k + 1)</code>
    </p>
    <p>
      IH:<code> forall p, p * fact k = facti p k</code>
    </p>
    <ul>
      <li>
        <Pair item1={`p * fact (k + 1) = p * (k + 1) * fact k`}>
          by evaluation
        </Pair>
      </li>
      <li>
        <Pair item1={` = facti (p * (k + 1)) k`}>
          IH, instantiating its p as p * (k + 1)
        </Pair>
      </li>
      <li>
        <Pair item1={`facti p (k + 1) = facti (p * (k + 1)) k`}>
          By evaluation
        </Pair>
      </li>
    </ul>
    <p>Claim: forall n, fact n = fact_tr n</p>
    <p>Proof</p>
    <ul>
      <li>
        <Pair item1={`fact n`}>
          <></>
        </Pair>
      </li>
      <li>
        <Pair item1={`= 1 * fact n`}>by algebra</Pair>
      </li>
      <li>
        <Pair item1={`= facti 1 n`}>by previous claim</Pair>
      </li>
      <li>
        <Pair item1={`= fact_tr n`}>by evaluation</Pair>
      </li>
    </ul>
    <h4>Second Example</h4>
    <caption>We will prove by induction on s that for any k,</caption>
    <pre className={"smolText"}>
      <OCaml code={`fold_right' s k = k (fold_right f s b).`} />
      {`Basis: s = [].`}
    </pre>
    <OCaml code={`fold_right' [] k = k b = k (fold_right f [] b)`} />
    <pre>{`by the first clauses in the definitions of fold_right'
and fold_right. Induction step: s = x::xs.`}</pre>
    <OCaml
      code={`fold_right' (x::xs) k = fold_right' xs (fun y -> k (f x y))`}
    />
    <pre>{`by the second clause in the definition of fold_right'`}</pre>
    <ul>
      <li>
        <Pair item1={"= (fun y -> k (f x y)) (fold_right f xs b)"}>
          by the induction hypothesis
        </Pair>
      </li>
      <li>
        <Pair item1={"= k (f x (fold_right f xs b))"}>
          by the substitution model
        </Pair>
      </li>
      <li>
        <Pair item1={"= k (fold_right f (x::xs) b)\n"}>
          by 2nd clause in defn of fold_right.
        </Pair>
      </li>
    </ul>
    <pre>
      {`In particular, for k the identity function
fn x => x on which fold_right' is initially called,
fold_right' s (fn x -> x) = fold_right f s b
thus the 2 fold_rights above are equivalent.`}
    </pre>
  </TopicCard>
);
export const HOFTopic = (
  <TopicCard title={"Higher Order Functions"} color="rgba(0,255,255,0.3)">
    <h4>Binary Tree HOFs</h4>
    operations on lists (List.map, List.fold_left, List.for_all, ...), church
    numerals, church-encoded option, defining HOFs for new data types such as
    various trees.
  </TopicCard>
);

export const ChurchTopic = (
  <TopicCard title={"Church Encoding"} color="rgba(255,0,255,0.3)">
    <caption>
      Sample Question: Suppose {`n : 'b -> ('b -> 'b) -> 'b`} is a church
      numeral. What is this in math?
    </caption>
    <code>{`fun z s -> n z (fun a -> s (s a))`}</code>
    <caption>
      Answer: <code>Multiply church by 2</code>
    </caption>
    <caption>We add 2S's to the front of the number.</caption>
    <ul>
      <li>
        <Pair item1={"Church 0"}>{`fun f x -> x`}</Pair>
      </li>
      <li>
        <Pair item1={"Church 1"}>{`fun f x -> f x`}</Pair>
      </li>
      <li>
        <Pair item1={"Church 2"}>{`fun f x -> f (f x)`}</Pair>
      </li>
      <li>
        <Pair item1={"Church 3"}>{`fun f x -> f (f (f x))`}</Pair>
      </li>
    </ul>
    <h4>Church Booleans</h4>
    <ul>
      <li>
        <Pair item1={"Church True"}>{`fun x y -> x`}</Pair>
      </li>
      <li>
        <Pair item1={"Church False"}>{`fun x y -> y`}</Pair>
      </li>
    </ul>
    <h4>Church Option</h4>
    <ul>
      <li>
        <Pair item1={"Church None"}>{`fun x -> x`}</Pair>
      </li>
      <li>
        <Pair item1={"Church Some"}>{`fun x -> fun y -> x`}</Pair>
      </li>
    </ul>
    <h4>Multiply 2 Church Numerals</h4>
    <SyntaxHighlighter
      customStyle={{ ...customStyle, fontSize: "5.5px" }}
      language={"ocaml"}
    >
      {`let mult (n1 : 'b church) (n2 : 'b church) : 'b church =
    fun z s -> n1 z (fun r -> n2 r s)`}
    </SyntaxHighlighter>
    <p>{`This one is similar to add. However, the base case for n1 is now zero. The successor case is more interesting; it
            takes in some church numeral r and applies it to n2 r s, which basically means "add n2 to r."
            Putting it all together, the successor function that we pass to n1 is the "add by n2" function, which gives us
            multiplication `}</p>
    <h4>Add 2 Church Numerals</h4>
    <SyntaxHighlighter
      customStyle={{ ...customStyle, fontSize: "5.5px" }}
      language={"ocaml"}
    >
      {`let add (n1 : 'b church) (n2 : 'b church) : 'b church =
  fun z s -> n2 (n1 z s) s
`}
    </SyntaxHighlighter>
    <h4>Sum List of Church Numerals</h4>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
      {`let sum (l : 'b church list) : 'b church =
  List.fold_left (fun acc x -> add acc x) zero l`}
    </SyntaxHighlighter>
    <h4>Church Logic</h4>
    <caption>Mystery one is the same as {`fun a b -> a && b`}</caption>
    <OCaml code={`let mystery_1 i1 i2 = fun a b -> i1 (i2 a b) b`} />
    <caption>Mystery two is the same as {`fun a b -> a || b`}</caption>
    <OCaml code={`let mystery_2 i1 i2 = fun a b -> i1 a (i2 a b)`} />
    <caption>Mystery three is the same as {`fun a b -> a && (not b)`}</caption>
    <OCaml code={`let mystery_3 i1 i2 = fun a b -> i1 (i2 a b) a`} />
    {/*//TODO: verify*/}
  </TopicCard>
);

export const CPSTopic = (
  <TopicCard title={"Continuation Passing Style"} color="rgba(0,0,255,0.3)">
    <caption>
      CPS makes explicit notions of temporary variables and order of operations!
      It allows for exceptions, backtracking, generators, & more.
    </caption>
    <h4>Exceptions</h4>
    <caption>
      Here, we implement an exception using CPS with the “thro” function in
      JavaScript
    </caption>
    <SyntaxHighlighter customStyle={customStyle} language={"javascript"}>
      {`function fact (n,ret,thro) {
 if (n < 0) thro("n < 0") else if (n == 0) ret(1)
 else   fact(n-1, function (t0) { ret(n*t0) ;},
 thro)}`}
    </SyntaxHighlighter>
    <h4>Backtracking</h4>
    <caption>Backtracking with exception in OCaml</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
      {`let rec find tree key = match tree with
\t| Empty -> raise NotFound 
\t| Node (l, key', v, r) ->
\t\tif key' = key then v
\t\t\telse
\t\t\t\ttry
\t\t\t\t\tfind l key
\t\t\t\twith NotFound -> find r key`}
    </SyntaxHighlighter>
    <caption>Backtracking with CPS in OCaml</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
      {`let rec find_cps tree key k = match tree with
  | Empty -> k None
  | Node (l, key', v, r) ->
    if key' = key then k (Some v)
    else
      find_cps l key (fun v ->
        match v with
        | Some _ -> k v
        | None -> find_cps r key k)`}
    </SyntaxHighlighter>
    <h4>Performance Implications</h4>
    <ul>
      <li>
        <Pair item1={"CPS"}>{`Stack space optimization`}</Pair>
      </li>
      <li>
        <Pair item1={"Tail Recursion"}>{`Stack space optimization`}</Pair>
      </li>
    </ul>
    <h4>Convert to CPS / TR</h4>
    <ul>
      <li>reduce stack space use</li>
      <li>change type: A into (A → ‘r) → ‘r</li>
      <li>change implementat: call continuation instead of returning</li>
    </ul>

    <caption>
      Original, non-cps function, pseudocode (p function checks if condition is
      true, node x is the root of the subtree we care about)
    </caption>
    <span className={"twoCol"}>
      <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
        {`(*('a -> bool) -> 'a tree -> 'a list *)
let find_all p x: = 
  |Empty -> []
  |Node (l,x,r) ->
    let good_l = find_all p l in 
    let good_r = find_all p r in 
    (*x go between r and l*)
    if p x then 
      good_l @ x :: good_r
    else 
      good_l @ good_r`}
      </SyntaxHighlighter>
      <div>
        {" "}
        <caption>Definition of binary tree</caption>
        <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
          {`type 'a tree = 
  |Empty 
  |Node of 'a tree * 'a * 'a tree`}
        </SyntaxHighlighter>
      </div>
    </span>
    <caption>
      CPS / Tail Recursive version → note that we recurse with the continuation
      in the args to our recursive call for the left side and inside that for
      the right side.
    </caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
      {`(* (p: 'a -> bool) (t: 'a tree) (return: 'a list -> 'r)*)
let find_all_cps : p x ret =
\t| Empty -> ret []
\t| Node (l,x,r) ->
\t\tfind_all_cps p l (fun good_l -> 
          find_all_cps p r (fun good_r -> 
              if p x then 
                ret (good_l @ x :: good_r)
              else 
                ret (good_l @ good_r))`}
    </SyntaxHighlighter>
    <OCaml
      code={`let inc (x : int) : int = x + 1

let inc_cps (x : int) (c : int -> int) : int = c (x + 1)`}
    />
  </TopicCard>
);

export const BasicSyntaxTopic = (
  <TopicCard title={"Basic Syntax"} color="rgba(100,100,255,0.3)">
    <ul>
      <li>
        <Pair item1={"Floating Point Math"}>+. -. /. *.</Pair>
      </li>
      <li>
        <Pair item1={"Int Math"}> + - / *</Pair>
      </li>
      <li>
        <Pair item1={"Boolean"}> && || not</Pair>
      </li>
      <li>
        <Pair item1={"Comparison"}>{` = != < > <= >=`}</Pair>
      </li>
      <li>
        <Pair item1={"String"}> ^ (concat)</Pair>
      </li>
      <li>
        <Pair item1={"List"}> [x; y]</Pair>
      </li>
      <li>
        <Pair item1={"Tuple"}> (x , y)</Pair>
      </li>
      <li>
        <Pair item1={"Record"}> {`{x = 1; y = 2}`}</Pair>
      </li>
      <li>
        <Pair item1={"Pattern Matching"}> match x with</Pair>
      </li>
      <li>
        <Pair item1={"Function"}> {`fun x -> x + 1`}</Pair>
      </li>
      <li>
        <Pair item1={"Local Variable"}> let x = 1 in</Pair>
      </li>
      <li>
        <Pair item1={"Local Function"}> let f x = x + 1 in</Pair>
      </li>
      <li>
        <Pair item1={"if"}> if...then...else...</Pair>
      </li>
      <li>
        <Pair item1={"try"}> try...with</Pair>
      </li>
    </ul>
  </TopicCard>
);

export const ExecutionBNFTopic = (
    <TopicCard title={"Backus-Naur Form"} color="rgba(100,100,255,0.3)">
        <ul>

        </ul>
    </TopicCard>
);

export const InferenceRules = (
  <TopicCard title={"Backus Naur Form - Exec"} color="rgba(100,100,255,0.3)">
    <ul>
      <li>
        <Pair
          item1={"Basic Format, premises on top must be true then e is true"}
        >
          <Ltx bigFont>{"\\frac{p_1 \\cdots p_n}{e}"}</Ltx>
        </Pair>
      </li>

          <Variable>if...then...else</Variable>
        <li>
          <ListPairItem item1={"B_IFTRUE"} item2={<Ltx bigFont>{`\\frac{e_1 \\downarrow \\textbf{true} \\ \\ \\ \\ e_2 \\downarrow v}{\\textbf{if} \\ e \\  \\textbf{then} \\ e_1 \\ \\textbf{else} \\ e_2}`}</Ltx>}/>
        </li>
        <li>
          <ListPairItem item1={"B_IFFALSE"} item2={<Ltx bigFont>{`\\frac{e_1 \\downarrow \\textbf{false} \\ \\ \\ \\ e_3 \\downarrow v}{\\textbf{if} \\ e \\  \\textbf{then} \\ e_1 \\ \\textbf{else} \\ e_2}`}</Ltx>}/>
        </li>
    </ul>
      <Divider/>
       Every sub expression of the main one on the above line of the inference rule recursively, in the same form as the call tree of the function (see IntelliJ debugger) → that is a proof
      <Divider/>
      <p>Question: execute</p>
      <Ltx>
          {`\\frac{}{\\textbf{if} \\ ((4-1)\\lt6) \\ \\textbf{then} \\ 3 + 2 \\ \\textbf{else} \\ 4 }`}
      </Ltx>
      <p>Answer:</p>
      <Ltx bigFont>
          {`\\frac{\\frac{\\frac{\\frac{}{4 \\downarrow 4} \\ \\frac{}{1 \\downarrow 1}}{4 - 1 \\downarrow 3}}{((4 - 1) \\lt 6) \\downarrow \\textbf{true}} \\ \\ \\ \\frac{\\frac{}{3 \\downarrow 3} \\ \\  \\frac{}{2 \\downarrow 2}}{(3 + 2) \\downarrow 5}}{\\textbf{if} \\ ((4-1)\\lt6) \\ \\textbf{then} \\ 3 + 2 \\ \\textbf{else} \\ 4 \\downarrow 5}`}
      </Ltx>
  </TopicCard>
);

export const LazyTopic = (
  <TopicCard title={"Lazy vs Eager Evaluation"} color="rgba(100,0,0,0.3)">
    <ul>
      <li>
        <Pair item1={"Lazy"}>
          evaluate only when needed (call by reference)
        </Pair>
      </li>
      <li>
        <Pair item1={"Eager"}>
          evaluate as soon as possible (call by value)
        </Pair>
      </li>
      <DotDivider />
      <li>
        <Pair item1={"Pros & Cons"}>
          Lazy Cannot easily reason, may make effects unpredictable
        </Pair>
      </li>
      <li>
        <Pair item1={"..."}>
          Eager Can reason about effects, but may be inefficient
        </Pair>
      </li>
      <li>
        <Pair item1={"..."}>
          Lazy may unnecessarily execute multiple times, fixable using ref
        </Pair>
      </li>
    </ul>
    <Divider />
    <p>
      When we have the function <Variable>eval</Variable>, the cases for{" "}
      <Variable>Let</Variable>, <Variable>Var</Variable>, and{" "}
      <Variable>Fun</Variable> can be modified for lazy.
    </p>
    {/*TODO: verify this code*/}
    <OCaml
      code={`let rec eval (e : expr) : value =
 | Let (x, e1, e2) -> 
 (*...previous code...*)
\tlet v = r e1 in         (*First eval e1 with the old env*)
\tlet r' = (x,v) :: r in  (*Now append the value of the computation to env*)
\teval r' e2              (*Carry on with e2 with the new env*)
| Var x -> eval List.assoc x r (*return eval env.get(x)*)
| Fun (x, e) -> FunV (x, e, r)
(*Use ref to not repeat evaluations with every lookup*)`}
    />
  </TopicCard>
);

export const EvalTopic = (
  <TopicCard title={"Evaluation"} color="rgba(10,24,100,0.3)">
    <p>
      The function <Variable>eval</Variable> requires some types and setup
      first.
    </p>
    <OCaml
      code={`type tp =
  | Arrow of tp list * tp | Int | Bool (* function type: S1 S2 ... Sn -> T *)
 type name = string
 type primop = Equals | LessThan | Plus | Minus | Times | Negate
type exp =
  | I of int                          (* 0 | 1 | 2 | ... *)
  | B of bool                         (* true | false *)
  | If of exp * exp * exp             (* if e then e1 else e2 *)
  | Primop of primop * exp list       (* e1 <op> e2  or <op> e *)
  | Fn of (name * tp) list * exp      (* fn (x_1: t_1, ..., x_n: t_n) => e *)
  | Rec of name * tp * exp            (* rec (f: t) => e *)
  | Let of name * exp * exp           (* let x = e1 in e2 end *)
  | Apply of exp * (exp list)         (* e (e_1, e_2, ..., e_n) *)
  | Var of name                       (* x *)
  | Clo of env * name * exp (*This weirdo represents what a fn returned.

  
Stores the env from when The fn was defined -> saves states of the local vars*)
and 
type env = (name * exp) list (*map of names to their values,
                                index via List.assoc*)`}
    />
  </TopicCard>
);

export const TypeInferenceForFun = (
  <TopicCard title={"Type Inference for Functions"} color="rgba(10,24,100,0.3)">
    <OCaml
      code={`type ctx = list (name * typ)
let rec eval (g: ctx) (e: exp): exp = function
 (* ...prev with g added to calls *)
| Let (x, e1, e2) -> (*Let x = e1 in e2*)
\tlet t = infer g e1 in (*Infer type of e1*)
\tinfer ((x,t) :: g) e2 (*append the infr'd g to first exp, infer e2*)
| Fun (x, t, e) ->
\tArrow (t, infer ((x, t)::g) e)(*Type is arrow of function's
\t type annotation to type inference given context on the body*)
| Var x -> List.assoc x g (*lo*)`}
    />
  </TopicCard>
);

export const Unification = (
  <TopicCard title={"Unification"} color="rgba(10,24,100,0.3)">
    <p>
      Unification is the process of finding a substitution that makes two types
      equal.
    </p>
    <p>
      For example, if we have <Variable>Arrow (TInt, TBool)</Variable> and{" "}
      <Variable>Arrow (TInt, TInt)</Variable>, we can unify them by substituting{" "}
      <Variable>TBool</Variable> for <Variable>TInt</Variable>.
    </p>
    <OCaml
      code={`let unify =
  let rec unify substitution t1 t2 =
    match t1, t2 with
    (* Unifying identical concrete types does nothing *)
    | UInt, UInt
    | UBool, UBool -> substitution
    | UTVar a, UTVar a' when a = a' -> substitution

    (* For type constructors, recursively unify the parts *)
    | UArrow (t1, t1'), UArrow (t2, t2') ->
        let substitution' = unify substitution t1 t2 in
        unify substitution' t1' t2'

    | UCross ts1, UCross ts2 ->
      (try
        let type_pairs = List.combine ts1 ts2 in
        List.fold_left
          (fun substitution' (t1, t2) -> unify substitution' t1 t2)
          substitution
          type_pairs
      with
      | Invalid_argument _ -> unif_error @@ UnifMismatch (t1, t2))

    | UTVar a, _ -> unifyVar substitution a t2
    | _, UTVar b -> unifyVar substitution b t1
    (* All other cases are mismatched types. *)
    | _, _ -> unif_error @@ UnifMismatch (t1, t2)
    
      (* Unify a variable with a type *)
  and unifyVar substitution a t =
    let rec occurs = function
      | UInt | UBool -> false
      | UArrow (t1, t2) -> occurs t1 || occurs t2
      | UCross ts -> List.exists occurs ts
      | UTVar b ->
          if a = b
          then true
          else
            match UTVarMap.find_opt b substitution with
            | None -> false
            | Some t' -> occurs t'
    in
    if occurs t
    then unif_error UnifOccursCheckFails
    else 
      match UTVarMap.find_opt a substitution with
      | None -> UTVarMap.add a t substitution
      | Some t' -> unify substitution t t'
  in fun t1 t2 -> unify UTVarMap.empty t1 t2

`}
    />
  </TopicCard>
);

export const InferCode = (
  <TopicCard
    title={"Type Inference Implementation"}
    color="rgba(10,24,100,0.3)"
  >
    <OCaml
      code={`let rec infer ctx e =
  match e with
  | Var x ->
      begin
        try lookup x ctx
        with Not_found -> raise (TypeError (Free_variable x))
      end
  | I _ -> Int
  | B _ -> Bool

  | Primop (po, exps) ->
      let (domain, range) = primopType po in
      check ctx exps domain range

  | If (e, e1, e2) ->
      begin
        match infer ctx e with
        | Bool ->
            let t1 = infer ctx e1 in
            let t2 = infer ctx e2 in
            if t1 = t2 then t1
            else type_mismatch t1 t2
        | t -> type_mismatch Bool t
      end

  | Let (x, e1, e2) ->
      let t1 = infer ctx e1 in
      infer (extend ctx (x, t1)) e2

  | Rec (f, t, e) ->
      let ctx' = extend ctx (f, t) in
      let t' = infer ctx' e in
      if t' = t then t
      else type_mismatch t t'

  | Fn (xs, e) ->
      let ctx' = extend_list ctx xs in
      let ts = List.map snd xs in
      Arrow (ts, infer ctx' e)

  | Apply (e, es) ->
      begin
        match infer ctx e with
        | Arrow (ts, t) -> check ctx es ts t
        | t' -> raise (TypeError (Apply_non_arrow t'))
      end

and check ctx exps tps result =
  match exps, tps with
  | [], [] -> result
  | e :: es, t :: ts ->
      let t' = infer ctx e in
      if t = t' then check ctx es ts result
      else type_mismatch t t'
  | _ -> raise (TypeError Arity_mismatch)`}
    />
  </TopicCard>
);

export const EvalImpl = (
  <TopicCard title={"Evaluation Implementation"} color="rgba(10,24,100,0.3)">
    <OCaml
      code={`let rec eval exp =
  match exp with
  (* Values evaluate to themselves *)
  | I _ -> exp
  | B _ -> exp
  | Fn _ -> exp
  (* This evaluator is _not_ environment-based. Variables should never
     appear during evaluation since they should be substituted away when
     eliminating binding constructs, e.g. function applications and lets.
     Therefore, if we encounter a variable, we raise an error. *)
  | Var x -> raise (Stuck (Free_variable x))
  (* Primitive operations: +, -, *, <, = *)
  | Primop (po, args) ->
      let args = List.map eval args in
      begin
        match eval_op po args with
        | None -> raise (Stuck Bad_primop_args)
        | Some v -> v
      end
  | If (e, e1, e2) ->
      begin
        match eval e with
        | B true -> eval e1
        | B false -> eval e2
        | _ -> raise (Stuck If_non_true_false)
      end
  | Let (x, e1, e2) ->
      let e1 = eval e1 in
      eval (subst (e1, x) e2)
  | Rec (f, _, e) -> eval (subst (exp, f) e)
  | Apply (e, es) ->
      begin
        match eval e with
        | Fn (xs, e) ->
            if List.length xs = List.length es then
              let es = List.map eval es in
              let xs = List.map fst xs in
              let subs = List.combine es xs in
              eval (subst_list subs e)
            else
              raise (Stuck Arity_mismatch)

        | _ -> raise (Stuck Apply_non_fn)
      end
      `}
    />
  </TopicCard>
);

export const References = <TopicCard title={"References"} color="rgba(244,10,0,0.3)">
  <ul>
      <li><Pair item1={"mutable type"}><OCaml code={`type t = { mutable i : int }`}/></Pair></li>
      <li><Pair item1={"init"}><OCaml code={` let x = ref 0     let y = { i = 5 }`}/></Pair></li>
      <li><Pair item1={"retrieval"}><OCaml code={`let val1 = !x      let val2 = y.i`}/></Pair></li>
      <li><Pair item1={"assignment"}><OCaml code={`x:=9      y.i < -1`}/></Pair></li>
  </ul>
    <p>
        We can imagine a type <Variable>T ref</Variable> as a tuple of a read and write func <Variable>{`(unit -> T) * (T -> unit)`}</Variable>
    </p>
</TopicCard>;

    export const SubTypingTopic = <TopicCard title={"Subtyping"} color="rgba(244,10,0,0.1)">
    <ul>
        <ListPairItem item1={"Built-in Types"} item2={<p>eg. <Variable>{`int <= float`}</Variable></p>}/>
        <ListPairItem item1={"Reflexivity"} item2={"Every item is its own subtype"}/>
        <ListPairItem item1={"Transitivity"} item2={<Ltx>if \ S \leq T \  and \  T \leq U,  \ then  \ S \leq U</Ltx>}/>
        <ListPairItem item1={"Product Types Covariant"} item2={<Variable>int * float ≤ float * float</Variable>}/>
        <p>Functions</p>
        <ListPairItem item1={"Covariant on output"} item2={<p><LtxVariable>{`T \\rightarrow \\textbf{int}`}</LtxVariable> ≤ <LtxVariable>{`T \\rightarrow \\textbf{float}`}</LtxVariable></p>}/>
        <ListPairItem item1={"Contravariant on input"} item2={<p><LtxVariable>{`\\textbf{float} \\rightarrow T `}</LtxVariable> ≤ <LtxVariable>{`\\textbf{int} \\rightarrow T `}</LtxVariable></p>}/>
        <ListPairItem item1={"& Both at once"} item2={<p><LtxVariable>{`\\textbf{float} \\rightarrow \\textbf{int} `}</LtxVariable> ≤ <LtxVariable>{`\\textbf{int} \\rightarrow \\textbf{float} `}</LtxVariable></p>}/>
        <ListPairItem item1={"Reference"} item2={<p>Apply fn rules on read and write <LtxVariable>{`(\\textbf{unit} \\rightarrow T) * (T \\rightarrow \\textbf{unit})`}</LtxVariable></p>}/>
    </ul>
        <DotDivider/>
        <p>Whenever we see a subtype, the compiler adds a special casting function up which upcasts S to T</p>
        <DotDivider/>
        <ul>
            <ListPairItem item1={"S-FN Subtyping rule"} item2={<Ltx bigFont>{`\\frac{T_1 \\leq S_1 \\ \\ \\ \\ \\ S_2 \\leq T_2}{S_1 \\rightarrow S_2 \\leq T_1 \\rightarrow T_2}`}</Ltx> }/>
        </ul>

    </TopicCard>

export const FreeVariables = <TopicCard title={"Free Variables"} color="rgba(244,10,0,0.1)">
    <ul>
        <ListPairItem item1={"FV(x)"} item2={<Ltx>{`\\{x\\}`}</Ltx>}/>
        <ListPairItem item1={"FV(e1 op e2)"} item2={<Ltx>{`\\textbf{FV}(e_1) \\cup \\textbf{FV}(e_2)`}</Ltx>}/>
        <ListPairItem item1={"FV(if e then e1 else e2)"} item2={<Ltx>{`\\textbf{FV}(e) \\cup \\textbf{FV}(e_1) \\cup \\textbf{FV}(e_2)`}</Ltx>}/>
        <ListPairItem item1={"FV(let x = e1 in e2 end)"} item2={<Ltx>{`\\textbf{FV}(e_1) \\cup (\\textbf{FV}(e_2) \\backslash \\{x\\})`}</Ltx>}/>
    </ul>
</TopicCard>

export const OCamlNotes = <TopicCard title={"OCaml Notes"} color="rgba(10,0,244,0.1)">
    <ul>
        <ListPairItem item1={"Functions are lazy"} item2={"functions not exec'd until needed"}/>
        <ListPairItem item1={"Functions are right associative"} item2={<p><Variable>{`fun a -> fun b -> fun c`}</Variable> = <Variable>{`fun a -> (fun b -> fun c)`}</Variable></p>}/>
    </ul>
</TopicCard>