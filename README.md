
# Cognitive Mechanics: TypeScript Simulation Framework

This package is a companion to the book, *Cognitive Mechanics*.


## Simulation Framework

We'll begin by demonstrating the framework for cognitive mechanical simulations by way of its basic structures and operations.

\newpage

### Imports

In the TypeScript framework, we import our basic operations, our `Entity` type, and our `DefaultKernel` like so:



```
import Entity from "cognitive-mechanics/Entity/Entity";
import {DefaultKernel, C, O, E, Y, X, T, k, tag, dot} 
    from "cognitive-mechanics/Kernel/DefaultKernel";
```



`Entity` is the base type that represents all concepts.

`DefaultKernel` is the default kernel of your program. The organization into `Kernel`s
allows you to modularize your code into separate machines, and to load them on demand. This will be covered further in Appendix B.

### Construction

`C` is a function that represents operation $C$. It takes two arguments: the first is a `name` that is used as an identifier to make debugging easier; the second is an `Array<Entity>` of the `components` of the new concept you are constructing.



```
const a = C('a', []); // a simple concept with no components
const b = C('b'); // alternate syntax
const c = C('c', [a, b]); // c is composed of a and b
```



This example is the equivalent of:

$$ a = \text{«a»} $$
$$ b = \text{«b»} $$
$$ c = \text{«c»} = \langle a, b \rangle $$

`O` is a synonym for `C` that does not have a first parameter for its name. This can be used to quickly construct an anonymous conceptual structure for convenient use. It is discouraged from overuse because in larger structures it will be very difficult to keep track of which object is which.



```
const d = O([a, b]); // d is an anonymous concept
```

### Enumeration

`E` is a function that represents to the operation $E$:



```
const comps = E(c); // comps == [a,b]
```



This is equivalent to:

$$ E(c) \to \{a, b\} $$



### Tags, Extraction & Transclusion

For implementation reasons, every tag used in extraction and transclusion is required to be a key. The key is required when constructing the subject of the operation, but not on the tag passed to `X` or `T`. Any concept can be made into a key with operation `k`, the analogue of $\kappa$:



```
const e = O([
    O([k(a), b])
]);
```



There is also a `tag` function which provides a shorthand for this. We could have constructed `e` above like this:



```
const e = O([
    tag(a,b)
]);
```



Let's demonstrate `X` and `T`:



```
const f = X(e, a); // f === b
const g = X(e, b); // Throws an error! b is not a key
const h = X(e, b, c); // c acts as default, so h === c

const i = T(e, a, c); // b is replaced by c in e to yield i
const j = T(e, b, c); // Because the key b is not set in e,
                      // tag(b, c) is added to e to yield j
```

### Proxy

We can import the proxy (i.e. `Proxy`) and dot proxy (i.e. `DotProxy`) as follows:



```
import Proxy from "cognitive-mechanics/Proxy/Proxy";
import DotProxy from "cognitive-mechanics/Proxy/DotProxy";
```

### Matching & Dot

`Y` is a function that represents to the operation $Y$. In the framework there are two concepts we may need to import: `TrueEntity`, which represents «true»—and `NullEntity`, which represents «false»;




```
import TrueEntity from "cognitive-mechanics/Entity/TrueEntity"
import NullEntity from "cognitive-mechanics/Entity/NullEntity"
```



We can run matches as follows:



```
Y(a, Proxy) === TrueEntity
Y(Proxy, DotProxy) === TrueEntity
Y(a, b) === NullEntity
```



These are equivalent to:

$$ Y(a,[\ ]) \to \text{«true»} $$
$$ Y([\ ],[\cdot]) \to \text{«true»} $$
$$ Y(a,b) \to \text{«false»} $$

And we can add the dot affix to any concept using the `dot()` function. For example, we can represent $\dot{«0»}$ as `dot(c0)`.



```
Y(c0, dot(c0)) === TrueEntity

const l = O([
    tag(a, Proxy)
]);

Y(e, l) === TrueEntity
Y(e, dot(l)) === NullEntity
Y(l, dot(l)) === TrueEntity
```


## B Simulated Machines

Now we'll take a look at how the operations from appendix A can be put to use as machines.

\newpage

### Creating a New Machine

Creating a new machine is as easy as creating a new instance of type `Kernel`. In this chapter we will demonstrate how to build a simulated machine `MC` equivalent to the machine $\mathcal{M}_C$ from §[composing-machine-definition].


```
import Kernel from "cognitive-mechanics/Kernel/Kernel;

const MC = new Kernel();
```

### State Specifiers

Now that we have our machine instance `MC`, need to create a $\sigma$-specifier. In our simulations, a specifier is simply a function that creates a new structure from the given parameters.

In our case, we will define `specC`, the analogue of $\sigma_C$. Let's look at our $\sigma_C$ definition from §[sigma-C-definition]:

$$ \sigma_c(s, o_1, o_2) ≡ \Big\langle \big\langle \text{«state»}, s \big\rangle, \big\langle \text{«op1»}, o_1 \big\rangle, \big\langle \text{«op2»}, o_2 \big\rangle \Big\rangle $$
$$ : \Upsilon\big( \big\{\text{«begin»}, \text{«end»}\big\}, \ \ \text{«state»} \big) $$

Our equivalent `specC` will be defined as:


```
const [state, [begin, end]] 
    = MC.label('state', ['begin', 'end']);

function specC (name: string, s : Entity, 
                o1 : Entity, o2 : Entity) 
{
    return C(name,
        [
            tag(state, s),
            tag(op1, o1),
            tag(op2, o2)
        ]
    );
}
```


The `name` parameter allows you to give a name to the state you specify.

Note the utility label `label`, whose first parameter is a "label" concept, and whose second parameter is a list of specific values of that label. The top line from the example above represents:

$$ \Upsilon\big( \big\{\text{«begin»}, \text{«end»}\big\}, \ \ \text{«state»} \big) $$

### Machine States & Relations

Now that we have our machine and a specifier, we will define our only state for $\mathcal{M}_C$, $s_{0_C}$ from §[s0c-definition]:


```
MC.state(specC('s0C', begin, Proxy, Proxy))
    .relation((s) => {
        return specC(
            'R(s0C)',
            end,
            Proxy,
            O([
                X(s, op1),
                X(s, op2),
            ])
        );
    });
```


Notice that the argument to `.relation()` is a callback function, whose first injected parameter is the current machine state. This allows you to gather information about the current machine state using `X`
in the defined relation.

Compare to the state and relation defined in §[s0c-definition] and §[s0c-relation]:

$$ s_{0_C} = \sigma_C(\text{«begin»},\  [\ ],\  [\ ]) $$
$$ R(s_{0_C}) \to \sigma_C\big(\text{«end»},\  [\ ],\  \langle s_{0_C}\text{[op1]}, s_{0_C}\text{[op2]} \rangle\big) $$

### Machine Specifiers

Similar to state specifiers, machine specifiers are also just functions. `specMC` will serve as our specifier for machine `MC`:


```
function specMC (c1 : Entity, c2 : Entity) {
    return specC('MC', begin, c1, c2);
}
```


### Running the Machine

With `MC` fully defined, let's show how to run it:


```
const a = C('a');
const b = C('b');

const r = MC.run(specMC(a, b));
```


Alternatively, we can `.extend()` and `Kernel` with any other `Kernel`. Most often you will do this to register a specific machine into your `DefaultKernel`. After a `Kernel` has been extended by another,
the extended kernel will execute any relations defined in the extension. For example:


```
DefaultKernel.extend(specMC(a, b));

const r2 = DefaultKernel.run(specMC(a, b));
```


In this case `r2` has the exact same structure as `r` above.

### Viewing Output

At it simplest, you can `console.log()` any Entity to reveal a portion of its structure. For example, `console.log(r)` produces the following output:


```
Entity {
  name: 'R(s0C)',
  components: [
    Entity { 
      name: '[state]', components: [Array], relations: [] 
    },
    Entity { 
      name: '[op1]', components: [Array], relations: [] 
    },
    Entity { 
      name: '[op2]', components: [Array], relations: [] 
    }
  ],
  relations: []
}
```


We can see that this output is limited in its utility because it only shows each entity to a certain level of depth and has additional information that isn't useful to us.

To solve this issue, included in the framework is a `Debug` utility, that includes a `.logStructure()` method for viewing the result in more detail. We can import and use
the `Debug` utility as follows:


```
import Debug from "cognitive-mechanics/Debug/Debug";
Debug.logStructure(r);
```


The above produces the more helpful (if not exactly beautiful) output:


```
{
  'R(s0C)': {
    '[state]': {
      '#state': { 
        state: { '{state}': {} }, 
        '{key}': {} 
      },
      end: { 
        '{state}': {}, 
        '{state:end}': {} 
      }
    },
    '[op1]': { 
      '#op1': { op1: {}, '{key}': {} }, 
      '[ ]': {} 
    },
    '[op2]': { 
      '#op2': { op2: {}, '{key}': {} }, 
      'C()': { 
        a: {}, 
        b: {} 
      } 
    }
  }
}
```


## C Numeric Simulations

Our framework also comes with utilities for working with numeric representations, demonstrated in this appendix.

\newpage

### Numeric Entities

First we need to define our basic numeric entities: `num`, the equivalent of «num»; `c0`, the equivalent of «0», and `anynum`, the equivalent of «any-num»:



```
const num = C('num', []);
const c0 = C('0', [k(num), Proxy]);
const anynum = c0;
```

### Operations

Our numbers wouldn't be of much use without the ability to increment them with `H0`—the equivalent of $H_0$.



```
function H0 (n : Entity) {
    let number = parseInt(n.name) + 1;
    let name = number.toString();
    
    return C(name, [k(num), n]);
}
```



The above implementation is actually slightly simplified to remove some input validation and caching logic that prevents duplicated of the same number being produced, which were removed for clarity.  The important code in `H0` is `return C(name, [k(num), n])`.

Compare with our mathematical definition of $H_0$ from §[counting-successor-definition]:

$$ H_0(n) ≡ C(\{ \text{«num»}, n \}) $$

Now we can define a very simple function `iH0`—the equivalent of $H_0^{-1}$:



```
function iH0 (n : Entity) {
    return X(O([n]), num);
}
```



`iH0` is based on $H_0^{-1}$ from §[counting-anti-successor-definition]:

$$ H_0^{-1}(n) ≡ X(\langle n \rangle, \text{«num»}) $$

### Other Numbers

We'll define a utility function `c` to allow us to turn a TypeScript `number` into an analogous conceptual structure. This function is purely for notational convenience and does not represent an actual operation in our system:



```
function c (n : number) {
    let number = c0;

    for (let i = 1; i <= n; i++) {
        number = H0(number);
    }

    return number;
}
```



This function was also modified to remove some caching logic that prevents duplicates of the same number.

And finally we have a constant `c1` to represent «1», and `not0` for «not-0»:



```
const c1 = c(1);
const not0 = c1;
```



### Importing

We can conveniently import numeric functionality from the framework with:



```
import {num, c0, c1, anynum, not0, H0, iH0} 
    from "cognitive-mechanics/Numeric/Core";
```

### Adding Machine

Now we have the infrastructure in place to implement an adding machine, the equivalent of $\mathcal{M}_{1_c}$ defined in §[counting-addition-machine].

Below we define our machine's `Kernel` `Mc1` and specifier `specc1`, and states:


```
const Mc1 = new Kernel;

function specc1 (name: string, a: Entity, 
                 b: Entity, r: Entity) 
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(sum, r),
        ]
    );
}

Mc1.state(
    specc1('sc10', Proxy, Proxy, DotProxy)
).relation((s : Entity) => {
    return specc1(
        'R(sc10)',
        Proxy,
        X(s, op2),
        X(s, op1)
    );
});

Mc1.state(
    specc1('sc11', DotProxy, not0, Proxy)
).relation((s : Entity) => {
    return specc1(
        'R(sc11)',
        Proxy,
        iH0(X(s, op2)),
        H0(X(s, sum))
    );
});

Mc1.state(
    specc1('sc12', DotProxy, dot(c0), Proxy)
).relation((s : Entity) => {
    return specc1(
        'R(sc12)',
        Proxy,
        Proxy,
        X(s, sum)
    );
});
```


With the above we can define a new operation `H1c`, the equivalent of $H_{1_c}$:


```
function H1c (a : Entity, b : Entity) {
    return X(
        Mc1.run(
            specc1('H1c()', a, b, Proxy)
        ), 
        sum
    );
}

let a = H1c(c(1), c(0)); // a == c(1)  
let b = H1c(c(3), c(4)); // b == c(7)
let c = H1c(c(24), c(6)); // c == c(30)
```

### Multiplying Machine

By repeating the operation `H1c`, we can create a multiplication operation `H2c`—representing $H_{2_c}$. Compare with $\mathcal{M}_{2_c}$, defined in §[counting-multiplication-machine]:


```
const Mc2 = new Kernel;

function specc2 (name: string, a: Entity, 
                 b: Entity, r: Entity) 
    : Entity
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(product, r),
        ]
    );
}

Mc2.state(
    specc2('sc20', Proxy, Proxy, dotProxy)
).relation((s : Entity) => {
    return specc2(
        'R(sc20)',
        X(s, op1),
        X(s, op2),
        c0
    );
});

Mc2.state(
    specc2('sc21', not0, Proxy, Proxy)
).relation((s : Entity) => {
    return specc2(
        'R(sc21)',
        iH0(X(s, op1)),
        X(s, op2),
        X(
            Mc1.run(
                specc1(
                    'Mc1()', 
                    X(s, product), 
                    X(s, op2), 
                    Proxy
                )
            ), 
            sum
        )
    );
});

Mc2.state(
    specc2('sc22', dot(c0), Proxy, Proxy)
).relation((s : Entity) => {
    return specc2(
        'R(sc22)',
        Proxy,
        Proxy,
        X(s, product)
    );
});

function H2c (a : Entity, b : Entity) {
    return X(
        Mc2.run(
            specc2('H2c()', a, b, Proxy)
        ), 
        product
    );
}
```


Notice the call to `MC1.run()` in the second relation. The same pattern holds for other hyperoperations.

## D Universal Simulations

We'll now use the framework to construct a universal machine, `MU`, the simulated representation of $\mathcal{M}_U$ from §[universal-conceptual-machine-definition].

With `MU`, we will demonstrate the emulation of `Mc1` and `Mc2`.

\newpage


### Machine Structure

We begin with the definition of the machine structure via base concepts, a state specifier `specU`, and a machine specifier `specMU`.


```
const MU = new Kernel;

const structure = C('structure');
const configurations = C('configurations');
const index = C('index');
const next = C('next');
const matched = C('matched');
const pattern = C('pattern');
const instruction = C('instruction');
const result = C('result');

function specU (name: string, s : Entity, c : Entity, i : Entity, 
                n : Entity, m : Entity, j : Entity, r : Entity) 
{
    return C(
        name,
        [
            tag(structure, s),
            tag(configurations, c),
            tag(index, i),
            tag(next, n),
            tag(matched, m),
            tag(instruction, j),
            tag(result, r),
        ]
    );
}

function specMU (name: string, s : Entity, c : Entity) {
    return specU(name, s, c, Proxy, Proxy, Proxy, Proxy, Proxy);
}
```


### Instruction Specifiers

We'll need an instruction specifier `specUi()`, the equivalent of $\epsilon$ defined in §[epsilon-definition]:


```
function specUi (name: string, s : Entity, 
                 c : Entity, j : Entity)
{
    return C(
        name,
        [
            tag(structure, s),
            tag(configurations, c),
            tag(instruction, j),
        ]
    );
}
```

### Instruction Evaluation

As well as ```evalUi()```, the equivalent of operation $V$, defined in §[operation-V-definition]:


```
function evalUi (s : Entity, c : Entity, i : Entity) {
    return X(
        MU.run(
            specUi('eval', s, c, i)
        ), 
        instruction
    );
}
```

### Evaluation Loop

And now we define the machine states for our evaluation loop. Compare with the states from §[universal-evaluation-cycle].

First is $s_{0_U}$, which initializes the system by setting «index» to «0» and «next» to the first configuration.


```
MU.state(
    specU('s0U', Proxy, Proxy, DotProxy, 
          DotProxy, Proxy, DotProxy, DotProxy)
).relation((s) => {
    return specU(
        'R(s0U)',
        X(s, structure),
        X(s, configurations),
        c0,
        X(X(s, configurations), c0, Proxy),
        NullEntity,
        Proxy,
        Proxy
    )
});
```


Second is $s_{1_U}$, which evaluates the instruction when a matching configuration is found,m and sets the «index» back to «0»:


```
MU.state(
    specU('s1U', Proxy, Proxy, anynum, 
          Proxy, TrueEntity, Proxy, DotProxy)
).relation((s) => {
    return specU(
        'R(s1U)',
        evalUi(
            X(s, structure),
            X(s, configurations),
            X(s, instruction)
        ),
        X(s, configurations),
        c0,
        X(X(s, configurations), c0, Proxy) as Entity,
        NullEntity,
        Proxy,
        Proxy
    )
});
```


Next is $s_{2_U}$, which stops when there is no «next» operation:


```
MU.state(
    specU('s2U', Proxy, Proxy, anynum, 
          DotProxy, Proxy, Proxy, Proxy)
).relation((s) => {
    return specU(
        'R(s2U)',
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        X(s, structure)
    )
});
```


And finally $s_{23_U}$, which procedes to the next configuration when the current is not a match:


```
MU.state(
    specU('s3U', Proxy, Proxy, anynum, 
          Proxy, NullEntity, Proxy, DotProxy)
).relation((s) => {
    return specU(
        'R(s3U)',
        X(s, structure),
        X(s, configurations),
        H0(X(s, index)),
        X(
            X(s, configurations), 
            H0(X(s, index)), 
            Proxy
        ),
        Y(
            X(s, structure), 
            X(
                X(
                    X(s, configurations), 
                    X(s, index)
                ), 
                pattern
            )
        ),
        X(
            X(
                X(s, configurations), 
                X(s, index)
            ), 
            instruction
        ),
        Proxy
    )
});
```

### Operations Speicifers & Relations

We'll also need several operation specifiers and relations. Let's start with our common concepts:


```
const op = C('op');
const op1 = C('op1');
const op2 = C('op2');
const op3 = C('op3');
const op4 = C('op4');
```


These concepts tag the role of each argument to the operation specifiers we'll soon be defining.

For our operation specifiers related to operation $C$, we need the following entity to serve as our value for `op`:


```
const opC = C('opC');
```


Now let's define out first operation specifier. We start with `C3` so that the defintion of `C2` doesn't match before `C3` can be applied:


```
function specopC3 (o1 : Entity, o2 : Entity, o3 : Entity) {
    return C(
        'opC3',
        [
            tag(op, opC),
            tag(op1, o1),
            tag(op2, o2),
            tag(op3, o3),
        ]
    );
}
```


And our relation:


```
MU.state(
    specUi('C3', Proxy, Proxy, specopC3(Proxy, Proxy, Proxy))
).relation((s) => {
    return specUi(
        '!C3', 
        X(s, structure), 
        X(s, configurations), 
        C(
            'R(C3)',
            [
                evalUi(
                    X(s, structure),
                    X(s, configurations),
                    X(X(s, instruction), op1)
                ),
                evalUi(
                    X(s, structure),
                    X(s, configurations),
                    X(X(s, instruction), op2)
                ),
                evalUi(
                    X(s, structure),
                    X(s, configurations),
                    X(X(s, instruction), op3)
                )
            ]
        )
    );
});
```


Notice we wrap the structure in `specUi()`, and then call `evalUi()` on each operand in order to recursively evaluate down the hierarchy.

Let's proceed with our other remaining definitions related to $C$:


```
function specopC2 (o1 : Entity, o2 : Entity) {
    return C(
        'opC2',
        [
            tag(op, opC),
            tag(op1, o1),
            tag(op2, o2),
        ]
    );
}

MU.state(
    specUi('C2', Proxy, Proxy, specopC2(Proxy, Proxy))
).relation((s) => {
    return specUi(
        '!C2', 
        X(s, structure), 
        X(s, configurations), 
        C(
            'R(C2)',
            [
                evalUi(
                    X(s, structure),
                    X(s, configurations),
                    X(X(s, instruction), op1)
                ),
                evalUi(
                    X(s, structure),
                    X(s, configurations),
                    X(X(s, instruction), op2)
                )
            ]
        )
    );
});
```


We require an operation for the specifier $\kappa$ in our simulations:


```
const opk = C('opk');

function specopk (o1 : Entity) {
    return C(
        'opk',
        [
            tag(op, opk),
            tag(op1, o1),
        ]
    );
}

MU.state(
    specUi('k', Proxy, Proxy, specopk(Proxy))
).relation((s) => {
    return specUi(
        '!k', 
        X(s, structure), 
        X(s, configurations), 
        k(
            evalUi(
                X(s, structure),
                X(s, configurations),
                X(X(s, instruction), op1)
            )
        )
    );
});
```


And because of how tagged concepts are handled in the simulations, a specifier for `tag()` that simply refers to other opartion specifiers:


```
const opTag = C('opTag');

function specopTag (o1 : Entity, o2 : Entity) {
    return specopC2(specopk(o1), o2);
}
```


Also required is a specifier for refs:


```
const ref = C('ref');

function specRef (a : Entity) {
    return C('&' + a.name, [k(ref), a]);
}

MU.state(
    specUi('ref', Proxy, Proxy, specRef(Proxy))
).relation((s) => {
    return specUi(
        '!ref', 
        X(s, structure), 
        X(s, configurations), 
        X(
            X(s, structure),
            X(
                C('', [X(s, instruction)]),
                ref
            )
        )
    );
});
```


Operations $X$, $T$, $H_0$, and so on all have very similar definitions, so I will only show $X$ for brevity:


```
const opX = C('opX');

function specopX (o1 : Entity, o2 : Entity) {
    return C(
        'opX',
        [
            tag(op, opX),
            tag(op1, o1),
            tag(op2, o2),
        ]
    );
}

MU.state(
    specUi('X', Proxy, Proxy, specopX(Proxy, Proxy))
).relation((s) => {
    return specUi(
        '!X', 
        X(s, structure), 
        X(s, configurations), 
        X(
            evalUi(
                X(s, structure),
                X(s, configurations),
                X(X(s, instruction), op1)
            ),
            evalUi(
                X(s, structure),
                X(s, configurations),
                X(X(s, instruction), op2)
            )
        )
    );
});
```


Finally, we have the eval operation, which allows for full operations to be evaluated:


```
const opEval = C('opEval');

function specEval (i : Entity) {
    return C(
        'opEval',
        [
            tag(op, opEval),
            tag(instruction, i),
        ]
    );
}

MU.state(
    specUi('eval', Proxy, Proxy, specEval(Proxy))
).relation((s) => {
    return specUi(
        '!eval',
        X(s, structure),
        X(s, configurations),
        X(MU.run(
            specMU(
                '!MU',
                evalUi(
                    X(s, structure),
                    X(s, configurations),
                    X(X(s, instruction), instruction)
                ),
                X(s, configurations)
            )
        ), result)
    );
});
```

### Configuration Specifier

We've also defined a configuration specifier for the simulation framework to make the definitions of the configurations more legible, by allows them to be defined in terms of a native TypeScript array:


```
function specConfigurations (cs : Array<Record<string, any>>)
{
    let configs = C('[configurations]', []);

    for (let i = 0; i < cs.length; i += 1) {
        configs = T(configs, c(i), C(
            '[configuration]',
            [
                tag(pattern, cs[i].pattern),
                tag(instruction, cs[i].instruction),
            ]
        ));
    }

    return configs;
}
```


### Multiplication Machine

Now we can look at a multiplication machine, implemented on our simulated universal machine. This is the equivalent to the machine defined in §[univeral-multiplication-machine].

First, let's define our state specifier, `specMult()`:


```
const product = C('product');

function specMult (name: string, a: Entity, b: Entity, r: Entity)
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(product, r),
        ]
    );
}
```


For notional clarity, we'll also define an operation specifier, `specopMult()`:


```
function specopMult (a : Entity, b : Entity, r : Entity)
{
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(product, r)
    )
}
```


We'll also need a specifier `specAdd()` for an addition machine, which will also be implemented for use by the multiplication machine.


```
const sum = C('sum');

function specAdd (name: string, a: Entity, b: Entity, r: Entity)
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(sum, r)
        ]
    );
}
```


And its equivalent operation specifier, `specopAdd()`:


```
function specopAdd (a : Entity, b : Entity, r : Entity)
{
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(sum, r)
    )
}
```


Now we define our initial machine state for the numerical operation $6 \times 4$ by combining the operations from an addition and multiplication machine into a single initial state of $MU$.

Each configuration shown below has an equivalent pattern and instruction defined in §[univeral-multiplication-machine]:


```
const s6x4 = specMU(
    'MU(6 * 4)',
    specMult('6 * 4', c(6), c(4), Proxy),
    specConfigurations([
        {
            pattern: specAdd('s0a', Proxy, Proxy, DotProxy),
            instruction: specopAdd(
                Proxy,
                specRef(op2),
                specRef(op1)
            )
        },
        {
            pattern: specAdd('s1a', DotProxy, not0, Proxy),
            instruction: specopAdd(
                Proxy,
                specopiH0(specRef(op2)),
                specopH0(specRef(sum))
            )
        },
        {
            pattern: specAdd('s2a', Proxy, dot(c0), Proxy),
            instruction: specopAdd(
                Proxy,
                Proxy,
                specRef(sum)
            )
        },
        {
            pattern: specMult('s0m', Proxy, Proxy, DotProxy),
            instruction: specopMult(
                specRef(op1),
                specRef(op2),
                c0
            )
        },
        {
            pattern: specMult('s1m', Proxy, not0, Proxy),
            instruction: specopMult(
                specRef(op1),
                specopiH0(specRef(op2)),
                specopX(
                    specEval(
                        specopAdd(
                            specRef(op1),
                            specRef(product),
                            Proxy
                        )
                    ),
                    sum
                )
            )
        },
        {
            pattern: specMult('s2m', Proxy, dot(c0), Proxy),
            instruction: specopMult(
                Proxy,
                Proxy,
                specRef(product)
            )
        },
    ])
)
```


And now we evaluate the operation:


```
X(
    X(
        MU.run(s6x4),
        result
    ), 
    product
)
```


To yield «24», i.e.:


```
Entity {
  name: '24',
  components: [
    Entity { name: '#num', components: [Array] },
    Entity { name: '23', components: [Array] }
  ]
}
```
