

import {C, DefaultKernel, k, X} from "../src/Kernel/DefaultKernel";
import {Mr, specr1, specr2, structure} from "../src/Repeater/Machine";
import Kernel from "../src/Kernel/Kernel";
import Entity from "../src/Entity/Entity";
import Proxy from "../src/Proxy/Proxy";
import {c, c1, H0, iH0, not0, numeral} from "../src/Numeric/Core";
import Debug from "../src/Debug/Debug";

DefaultKernel.extend(Mr);

let MC = new Kernel;

const [state, [begin, end]] = MC.label('state', ['begin', 'end']);
const [op1] = MC.label('op1', []);
const [op2] = MC.label('op2', []);

function specC (name : string, s : Entity, o1 : Entity, o2 : Entity) {
    return C(
        name,
        [
            C('[state]', [k(state), s]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
        ]
    );
}

MC.state(
    specC('sC0', begin, Proxy, Proxy)
).relation(
    (s) => {
        return specC(
            'R(sC0)',
            end,
            Proxy,
            C(
                'R(sC0*)',
                [
                    X(s, op1),
                    X(s, op2)
                ]
            )
        );
    }
);

DefaultKernel.extend(MC);

let A = C('A', []);
let B = C('B', []);

let res1 = DefaultKernel.run(
    specC('test1', begin, A, B)
);

Debug.logStructure(X(res1, op2));

let res2 = DefaultKernel.run(
    specr2(
        'test2',
        specC('C(A,B)', begin, A, B),
        c(3),
        state,
        begin,
        op1,
        A
    )
);

Debug.logStructure(X(res2, structure));

function Cop (A: Entity, B: Entity) {
    return X(
        DefaultKernel.run(
            specC('C()', begin, A, B)
        ),
        op2
    );
}

Debug.logStructure(Cop(A, B));

const Mex = new Kernel;

function specex (name : string, o1: Entity, o2: Entity, n: Entity) {
    return C(
        name,
        [
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
            C('[num]', [k(numeral), n]),
        ]
    );
}

Mex.state(
    specex('sex0', Proxy, Proxy, not0)
).relation(
    (s) => {
        return specex(
            'R(sex0)',
            X(s, op1),
            Cop(
                X(s, op1),
                X(s, op2)
            ),
            iH0(X(s, numeral))
        );
    }
);

DefaultKernel.extend(Mex);

let res3 = DefaultKernel.run(
    specex(
        'C(A,B)x3',
        A,
        B,
        c(3)
    )
);

Debug.logStructure(
    X(res3, op2)
);
