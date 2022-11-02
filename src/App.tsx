import React from 'react';
import './App.css';
import {TopicCard} from "./TopicCard";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

const Pair = ({item1, children}: {item1: string, children: React.ReactNode}) => {
  return (
      <span className={"pair"}>
        <p>{item1}</p>
        <code>{children}</code>
        </span>
  )
}

const ProofPair  = ({item1, children}: {item1: string, children: React.ReactNode}) => {
    return (
        <div>
        <p>{item1}</p>
        <code>{children}</code>
        </div>
    )
}

const customStyle={
    margin: 0,
    padding: 0,
    fontSize: 6,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderBottom: "1px solid rgba(0,0,0,0.8)",}

const OCaml = ({code}: {code: string}) => {
    return (
        <SyntaxHighlighter language="ocaml" customStyle={customStyle}>
            {code}
        </SyntaxHighlighter>
    )
}

const OptionalTopic = <TopicCard title={"Optional"} color={"rgba(0,255,255,0.25)"}>

    <ul>
        <li><Pair item1={"Optional int 42"}><OCaml code={`Some 42`}></OCaml></Pair></li>
        <li><Pair item1={"Optional None"}><OCaml code={`None`}></OCaml></Pair></li>
        <li><Pair item1={"Optional.get()"}><OCaml code={`let extract o =
  match o with
  | Some i -> string_of_int i
  | None -> "";;`}></OCaml></Pair></li>
        <li><Pair item1={"extract Some 42"}>42</Pair></li>
        <li><Pair item1={"extract None"}>None</Pair></li>
        <li><Pair item1={"t option"}>a type for every type t</Pair></li>
        <li><Pair item1={"None"}>a value of type 'a option</Pair></li>
        <li><Pair item1={"Some e "}>an expression of type t option if e : t</Pair></li>
        <li><Pair item1={"Some e "}>{`If e ==> v then Some e ==> Some v`}</Pair></li>
    </ul>
</TopicCard>

const CodeExamples = <TopicCard title={"Code Examples"} color={"rgba(255,128,0,0.25)"}>
    <h4>Conversion to CPS</h4>
    <caption>Consider function pow : {`int -> int -> int`} that computes nk</caption>
    <OCaml code={`let pow k n =
   if k = o then 1
   else n * pow (k -1) n`}/>
    <caption>Tail recursive Version</caption>
    <OCaml code={`
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
    `}/>
    <h4>Vector Scale</h4>
    <OCaml code={`implement a scale : ‘a vector * (’a → ‘b) → ‘b vector 
let scale: 'a vector * ('a -> 'b) -> 'b vector = 
  fun (v, f) -> map f v;;`}/>
    <h4>HOF Example</h4>
    <span className={"twoCol"}>
        <OCaml code={`let rec repeated (f,n) = 
if (n=0) then fun x → x 
 else x → f ((repeated (f,n-1) x)`}/>
        <caption>takes a function f and a non-negative integer n as arg. and returns the function that implies f:n times</caption>
    </span>
    <h4>Find card in list</h4>
    <OCaml code={`(it is tail recursive since every single recursive call is returned)
(output type is card option)
let rec find_color (c: color) (l: card mylist): card option =  match l with
|Nil -> None
|Cons ( (col,v), l) ->
if col = c then Some (col, v)
(the color didn't matched)
else find_color c l (imidiately returned)`}></OCaml>
<h4>Head of list that doesn't exist</h4>
    <OCaml code={`let head (l: 'a mylist): 'a = match l with
|Cons (x, _) ->x
|Nil -> raise EmptyList`}/>
    <h4>*** Code Example  - rev / rev_tr</h4>
    <span className={"twoCol"}>
          <OCaml code=
                     {
                         `(* naive *)
(* rev: 'a list -> 'a list *)
let rec rev l = match l with
\t| [] -> []
\t| x::l -> (rev l) @ [x];;
(* Define length *)
let rec length l = match l with
\t| [] -> 0
\t| h::t -> 1 + length t`
                     }
          />
        <OCaml code={`(* tail recursive *)
(* rev': 'a list -> 'a list *)
let rev' l =
(* rev_tr: 'a list -> 'a list -> 'a list *)
\tlet rec rev_tr l acc = match l with
\t| [] -> асс
\t| h::t -> rev_tr t (h: :acc)
in
rev_tr 1 [];;`} />
    </span>
</TopicCard>


const PlaceHolder = <TopicCard title={"Placeholder"} color={"#ffffff"}>
    <h1>Placeholder</h1>
</TopicCard>

const CoinSort = <TopicCard title={"Coin Sort"} color={"rgba(139,147,26,0.34)"}>
    <OCaml code={`(*list of coins, amount to make with those
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
    <p> The change function is a recursive function that takes a list of coins and an amount to make with those coins. It returns the sequence of coins that add up to the amount. </p>

</TopicCard>

const TypeInferenceTopic = <TopicCard title={"Type Inference"} color={"#4ae5a6"}>
   <ul>
         <li>
             <OCaml code={`3 / 0`}/>
         </li>
       <li><Pair item1={"Type"}>Int</Pair></li>
         <li><Pair item1={"Effect"}>DivByZero Error</Pair></li>
   </ul>
    <ul>
        <li>
            <OCaml code={`let head_of_empty list =
\tlet head (x::t) = x in
\t\thead []`}/>
        </li>
        <li><Pair item1={"Type"}>‘a list → ‘a <i>since we never return None, it will not be ‘a option</i></Pair></li>
        <li><Pair item1={"Effect"}>No value; cannot decompose an empty list into head and tail</Pair></li>
    </ul>
</TopicCard>

const MathTopic = <TopicCard title={"Math"} color={"#ef6e6e"}>
    <caption>Derivative (numeric)</caption>
    <OCaml code={`let derivative fx =
\tlet dx = 0.001 in
\tfun x -> (fx (x+.dx) -. fx x) /. dx ;;`}/>
    <caption>Derivative (symbolic)</caption>
    <OCaml code={`let rec diff (e : exp) : exp =
  match e with
  | Const f -> Const 0.0
  | Var -> Const 1.0
  | Plus (e1, e2) -> Plus (diff e1, diff e2)
  | Times (e1, e2) -> Plus (Times (diff e1, e2), Times (e1, diff e2))
  | Pow (e1, i) -> Times (Times
                (Const (float_of_int i), Pow (e1, i - 1)), diff e1)`}/>
    <caption>Collect Variables</caption>
    <OCaml code={`let collect_variables (formula : formula) : Variable_set.t =
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
  collect_variables_helper formula Variable_set.empty`}/>



</TopicCard>

const TypesTopic = <TopicCard title={"Generic Types"} color={"rgba(98,231,191,0.3)"}>
    <p>The use of ‘ before a variable name denotes a generic type.</p>
    <SyntaxHighlighter language="ocaml" customStyle={customStyle}>
        {
            `map ('a -> 'b) -> 'a list -> 'b list`
        }
    </SyntaxHighlighter>
    <caption>{`Operators like ==, >, < are automatically polymorphic → always work when using generics`}</caption>
    <h4>Custom Types</h4>
    <OCaml code={`type fraction = { num : int; denom : int; }`}/>
    <caption> Lower case is the variable name, uppercase is the type name.</caption>
    <OCaml code={`type number =
    Int of int | Float of float | Error`}/>
    <caption> Without type/name, the items are an enum.</caption>
    <OCaml code={`type sign = Positive | Negative`}/>
    <h4>Using Custom Types</h4>
    <OCaml code={`let sign_int n = 
    if n >= 0 then Positive else Negative;;`}/>

</TopicCard>

const TuplesTopic = <TopicCard title={"Tuples"} color={"rgba(234,255,1,0.29)"}>
    <OCaml code={`let minmax (a, b) : float * float =
  if a < b then (a, b) else (b, a)`}/>
    <caption>Here (a,b) is a tuple of type float * float</caption>
</TopicCard>

const CurryTopic = <TopicCard title={"Currying"} color={"rgba(150,231,98,0.3)"}>
    <caption>simple add function in OCaml which is NOT CURRIED</caption>
    <OCaml code={`(* val add : int -> int -> int = <fun> *)
let add x:int y:int = x + y`}/>
    <OCaml code={`let add = function (x : int) -> function (y : int) -> x + y`}/>
    <caption>Here, the function is curried.</caption>
    <OCaml code={`(* val add : (int * int) -> int = <fun> *)
let add (x:int, y:int) = x + y`}/>
    <OCaml code={`(* val add : (int * int) -> int = <fun> *)
let add = fun (z : int * int) -> match z with (x, y) -> x + y`}/>
    <ul>
        <li><Pair item1={"Curried"}>{`(int * int) → int`}</Pair></li>
        <li><Pair item1={"!Curried"}>{`int → int → int`}</Pair></li>
    </ul>
</TopicCard>

const ListOperationsTopic = <TopicCard title={"List Operations"} color={"rgba(130,0,0,0.4)"}>
    <caption>Lists are comprehended with head and tail; first item and rest of list, deconstructed from a tuple.</caption>
    <ul>
<li>
    <Pair item1={"Append item - @"}><SyntaxHighlighter customStyle={customStyle} language="ocaml">
        {
            `# [1] @ [2; 3];;
- : int list = [1; 2; 3]`
        }
    </SyntaxHighlighter></Pair>
    <Pair item1={"Head / Tail"}><SyntaxHighlighter customStyle={customStyle} language="ocaml">
        {
            `let rec sum lst =
  match lst with
  | [] -> 0
  | h::t -> h + sum t`
        }
    </SyntaxHighlighter></Pair>
    <Pair item1={"List Length"}><SyntaxHighlighter customStyle={customStyle} language="ocaml">
        {
            `let rec length lst =
    match lst with
    | [] -> 0
    | h::t -> 1 + length t`
        }
    </SyntaxHighlighter></Pair>
    <Pair item1={"Concat one item - ::"}><SyntaxHighlighter customStyle={customStyle} language="ocaml">
        {
            `# 1 :: [2; 3];;
- : int list = [1; 2; 3]`
        }
    </SyntaxHighlighter></Pair>


</li>


    </ul>
</TopicCard>
const ListHOFTopic = <TopicCard title={"List Operations HOF"} color="rgba(255,0,0,0.3)">
    <ul>
        <li><Pair item1={"List.map"}>{`(’a −> ’b) −> ’a list −> ’b list`}</Pair></li>
        <SyntaxHighlighter customStyle={customStyle} code={`let rec map f list =
match list with
 | [] -> []
 | h::t -> (f h) :: (map f t)`} language={"ocaml"} >
        </SyntaxHighlighter>
        <li><Pair item1={"List.length"}>{`’a list −> int`}</Pair></li>
        <SyntaxHighlighter customStyle={customStyle} language={"ocaml"} >
            {
                `let rec length list =
match list with
| [] -> 0
| _::t -> 1 + (length t)`
            }
        </SyntaxHighlighter>

        <li><Pair item1={"List.fold_left"}>{`(’ a −> ’b −> ’b) −> ’a list −> ’b −> ’b`}</Pair></li>
        <li><Pair item1={"List.for_all"}>{`(’ a −> bool) −> ’a list −> bool`} </Pair></li>
        <li><Pair item1={"List.exists"}> {`(’ a −> bool) −> ’a list −> bool`}</Pair></li>
        <li><Pair item1={"List.rev"}> {`’a list −> ’a list`}</Pair></li>
        <li><Pair item1={"List.find_opt"}> {`(’ a −> bool) −> ’a list −> ’a option`}</Pair></li>
        <li><Pair item1={"List.filter"}> {`(’ a −> bool) −> ’a list −> ’a list`}</Pair></li>
        <li><Pair item1={"List.init"}> {`int −> (int −> ’a) −> ’a list (∗by index∗)`}</Pair></li>
    </ul>

</TopicCard>

const ProofTopic = <TopicCard title={"Proofs"} color="rgba(0,255,0,0.3)">
    <h4>Lemmas</h4>
    <ul>
        <li><Pair item1={"Associativity"}>{`a + (b + c) = (a + b) + c`}</Pair></li>
        <li><Pair item1={"Commutativity"}>{`a + b = b + a`}</Pair></li>
        <li><Pair item1={"Function Associativity"}>{`Functions are left associative`}</Pair></li>
    </ul>
    <h4>Proving Equivalence Via Induction</h4>
    <ul>
        <li><Pair item1={"Base Case"}>{`P []`}</Pair></li>
        <li><Pair item1={"Inductive Step"}>{`P l -> P (h::l)`}</Pair></li>
    </ul>
    <p>So let’s strengthen the claim we are making. Instead of showing that fact n = facti 1 n, we’ll try to show forall p, p * fact n = facti p n. That generalizes the k + 1 we were stuck on to an arbitrary quantity p.
    </p>
    <OCaml code={`let rec facti acc n =
  if n = 0 then acc else facti (acc * n) (n - 1)
let fact_tr n = facti 1 n
val facti : int -> int -> int = <fun>
val fact_tr : int -> int = <fun>
`}/>
    <p>Claim: forall n, forall p . p * fact n = facti p n</p>
    <p>Proof: by induction on n.
    </p>
    <code>        P(n) = forall p, p * fact n = facti p n </code>
<p>Base case:  n = 0 ; Show: forall p,  p * fact 0 = facti p 0</p>
    <ul>
        <li><Pair item1={`p * fact 0 = p`}>
        by evaluation and algebra
        </Pair></li>
        <li><Pair item1={`p = facti p 0`}>by evaluation</Pair></li>
    </ul>
    <p>Inductive case: n = k + 1
    </p>
    <p>Show: <code>forall p,  p * fact (k + 1) = facti p (k + 1)</code>
    </p>
    <p>IH:<code> forall p,  p * fact k = facti p k</code>
    </p>
    <ul>
        <li><Pair item1={`p * fact (k + 1) = p * (k + 1) * fact k`}>
            by evaluation
        </Pair></li>
        <li><Pair item1={` = facti (p * (k + 1)) k`}>IH, instantiating its p as p * (k + 1)</Pair></li>
        <li><Pair item1={`facti p (k + 1) = facti (p * (k + 1)) k`}>By evaluation</Pair></li>
    </ul>
    <p>Claim: forall n, fact n = fact_tr n</p>
    <p>Proof</p>
    <ul>
        <li><Pair item1={`fact n`}>
        </Pair></li>
        <li><Pair item1={`= 1 * fact n`}>by algebra</Pair></li>
        <li><Pair item1={`= facti 1 n`}>by previous claim</Pair></li>
        <li><Pair item1={`= fact_tr n`}>by evaluation</Pair></li>
    </ul>
    <h4>Second Example</h4>
    <caption>We will prove by induction on s that for any k,</caption>
    <pre className={"smolText"}>
        <OCaml code={`fold_right' s k = k (fold_right f s b).`}/>
        {`Basis: s = [].`}</pre>
    <OCaml code={`fold_right' [] k = k b = k (fold_right f [] b)`}/>
    <pre>{`by the first clauses in the definitions of fold_right'
and fold_right. Induction step: s = x::xs.`}</pre>
    <OCaml code={`fold_right' (x::xs) k = fold_right' xs (fun y -> k (f x y))`}/>
    <pre>{`by the second clause in the definition of fold_right'
= (fun y -> k (f x y)) (fold_right f xs b)
by the induction hypothesis
= k (f x (fold_right f xs b))
by the substitution model
= k (fold_right f (x::xs) b)
by the second clause in the definition of fold_right.
In particular, for k the identity function
fn x => x on which fold_right' is initially called,
fold_right' s (fn x -> x) = fold_right f s b
thus the 2 fold_rights above are equivalent.`}
    </pre>
</TopicCard>
const HOFTopic = <TopicCard title={"Higher Order Functions"} color="rgba(0,255,255,0.3)">
    <h4>Binary Tree HOFs</h4>
    operations on lists (List.map, List.fold_left, List.for_all, ...), church numerals, church-encoded option,
    defining HOFs for new data types such as various trees.
</TopicCard>

const ChurchTopic = <TopicCard title={"Church Encoding"} color="rgba(255,0,255,0.3)">
    <caption>Sample Question: Suppose {`n : 'b -> ('b -> 'b) -> 'b`} is a church numeral. What is this in math?</caption>
    <code>{`fun z s -> n z (fun a -> s (s a))`}</code>
    <caption>Answer: <code>Multiply church by 2</code></caption>
    <caption>We add 2S's to the front of the number.</caption>
    <ul>
        <li><Pair item1={"Church 0"}>{`fun f x -> x`}</Pair></li>
        <li><Pair item1={"Church 1"}>{`fun f x -> f x`}</Pair></li>
        <li><Pair item1={"Church 2"}>{`fun f x -> f (f x)`}</Pair></li>
        <li><Pair item1={"Church 3"}>{`fun f x -> f (f (f x))`}</Pair></li>
    </ul>
    <h4>Church Booleans</h4>
    <ul>
        <li><Pair item1={"Church True"}>{`fun x y -> x`}</Pair></li>
        <li><Pair item1={"Church False"}>{`fun x y -> y`}</Pair></li>
    </ul>
    <h4>Church Option</h4>
    <ul>
        <li><Pair item1={"Church None"}>{`fun x -> x`}</Pair></li>
        <li><Pair item1={"Church Some"}>{`fun x -> fun y -> x`}</Pair></li>
    </ul>
    <h4>Multiply 2 Church Numerals</h4>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"} >
        {
    `let mult (n1 : 'b church) (n2 : 'b church) : 'b church =
  fun z s -> n2 (n1 z s) (fun x -> s (s x))`
        }
    </SyntaxHighlighter>
    <h4>Add 2 Church Numerals</h4>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"} >
        {
            `let add (n1 : 'b church) (n2 : 'b church) : 'b church =
  fun z s -> n2 (n1 z s) s
`
        }
    </SyntaxHighlighter>
    <h4>Sum List of Church Numerals</h4>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"} >
        {
            `let sum (l : 'b church list) : 'b church =
  List.fold_left (fun acc x -> add acc x) zero l`
        }
    </SyntaxHighlighter>
    //TODO: What logic operators do the following functions represent? (oct 25th rec 42:58)
    <h4>Church Logic</h4>
    <caption>Mystery one is the same as {`fun a b -> a && b`}</caption>
    <OCaml code={`let mystery_1 i1 i2 = fun a b -> i1 (i2 a b) b`}/>
    <caption>Mystery two is the same as {`fun a b -> a || b`}</caption>
    <OCaml code={`let mystery_2 i1 i2 = fun a b -> i1 a (i2 a b)`}/>
    <caption>Mystery three is the same as {`fun a b -> a && (not b)`}</caption>
    <OCaml code={`let mystery_3 i1 i2 = fun a b -> i1 (i2 a b) a`}/>
    {/*//TODO: verify*/}
</TopicCard>



const CPSTopic = <TopicCard title={"Continuation Passing Style"} color="rgba(0,0,255,0.3)">
    <caption>CPS makes explicit notions of temporary variables and order of operations! It allows for exceptions, backtracking, generators, & more.</caption>
    <h4>Exceptions</h4>
    <caption>Here, we implement an exception using CPS with the “thro” function in JavaScript</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"javascript"} >
        {
            `function fact (n,ret,thro) {
 if (n < 0) thro("n < 0") else if (n == 0) ret(1)
 else   fact(n-1, function (t0) { ret(n*t0) ;},
 thro)}`
        }
    </SyntaxHighlighter>
    <h4>Backtracking</h4>
    <caption>Backtracking with exception in OCaml</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"} >
        {
            `let rec find tree key = match tree with
\t| Empty -> raise NotFound 
\t| Node (l, key', v, r) ->
\t\tif key' = key then v
\t\t\telse
\t\t\t\ttry
\t\t\t\t\tfind l key
\t\t\t\twith NotFound -> find r key`
        }
    </SyntaxHighlighter>
    <caption>Backtracking with CPS in OCaml</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"} >
        {
            `let rec find_cps tree key k = match tree with
  | Empty -> k None
  | Node (l, key', v, r) ->
    if key' = key then k (Some v)
    else
      find_cps l key (fun v ->
        match v with
        | Some _ -> k v
        | None -> find_cps r key k)`
        }
    </SyntaxHighlighter>
    <h4>Performance Implications</h4>
    <ul>
        <li><Pair item1={"CPS"}>{`Stack space optimization`}</Pair></li>
        <li><Pair item1={"Tail Recursion"}>{`Stack space optimization`}</Pair></li>
    </ul>
    <h4>Convert to CPS / TR</h4>
    <ul>
        <li>reduce stack space use</li>
        <li>change type: A into (A → ‘r) → ‘r</li>
        <li>change implementat: call continuation instead of returning</li>
    </ul>

    <caption>Original, non-cps function, pseudocode (p function checks if condition is true, node x is the root of the subtree we care about)</caption>
    <span className={'twoCol'}>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
        {
            `(*('a -> bool) -> 'a tree -> 'a list *)
let find_all p x: = 
  |Empty -> []
  |Node (l,x,r) ->
    let good_l = find_all p l in 
    let good_r = find_all p r in 
    (*x go between r and l*)
    if p x then 
      good_l @ x :: good_r
    else 
      good_l @ good_r`

        }</SyntaxHighlighter>
        <div>   <caption>Definition of binary tree</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
        {
            `type 'a tree = 
  |Empty 
  |Node of 'a tree * 'a * 'a tree`
        }
        </SyntaxHighlighter></div>
        </span>
    <caption>CPS / Tail Recursive version → note that we recurse with the continuation in the args to our recursive call for the left side and inside that for the right side.</caption>
    <SyntaxHighlighter customStyle={customStyle} language={"ocaml"}>
        {
`(* (p: 'a -> bool) (t: 'a tree) (return: 'a list -> 'r)*)
let find_all_cps : p x ret =
\t| Empty -> ret []
\t| Node (l,x,r) ->
\t\tfind_all_cps p l (fun good_l -> 
          find_all_cps p r (fun good_r -> 
              if p x then 
                ret (good_l @ x :: good_r)
              else 
                ret (good_l @ good_r))`
        }
    </SyntaxHighlighter>
    <OCaml code={`let inc (x : int) : int = x + 1

let inc_cps (x : int) (c : int -> int) : int = c (x + 1)`}/>
</TopicCard>

const BasicSyntaxTopic = <TopicCard title={"Basic Syntax"} color="rgba(100,100,255,0.3)">
    <ul>
        <li><Pair item1={"Floating Point Math"}>+. -. /. *.</Pair></li>
        <li><Pair item1={"Int Math"}> + - / *</Pair></li>
        <li><Pair item1={"Boolean"}> && || not</Pair></li>
        <li><Pair item1={"Comparison"}>{` = != < > <= >=`}</Pair></li>
        <li><Pair item1={"String"}> ^ (concat)</Pair></li>
        <li><Pair item1={"List"}> [x; y]</Pair></li>
        <li><Pair item1={"Tuple"}> (x , y)</Pair></li>
        <li><Pair item1={"Record"}> {`{x = 1; y = 2}`}</Pair></li>
        <li><Pair item1={"Pattern Matching"}> match x with</Pair></li>
        <li><Pair item1={"Function"}> {`fun x -> x + 1`}</Pair></li>
        <li><Pair item1={"Local Variable"}> let x = 1 in</Pair></li>
        <li><Pair item1={"Local Function"}> let f x = x + 1 in</Pair></li>
        <li><Pair item1={"if"}> if...then...else...</Pair></li>
        <li><Pair item1={"try"}> try...with</Pair></li>
    </ul>
</TopicCard>



function App() {
  return (
      <body>
      <div className={"slimmerBoiColumn"}>
      {ListHOFTopic}
      {BasicSyntaxTopic}
      {HOFTopic}{TuplesTopic}
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

      <div className={"slimmerBoiColumn"} style={{height: "100%"}}>
          {OptionalTopic}
          {ChurchTopic}

      </div>
      </body>
  );
}

export default App;
