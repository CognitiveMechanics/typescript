
import {MU, specMU, specConfigurations, result, configurations, index, pattern, instruction, specU} from '../src/Universal/Machine';
import {C, O, DefaultKernel, tag, X, T, k, dot} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import {specEval, specRef, specopC2, specopC3, specopH0, specopiH0, specopTag, specopX,  op1, op2} from "../src/Universal/Operations";
import {c, c0, c1, H0, iH0, not0} from "../src/Numeric/Core";
import Entity from "../src/Entity/Entity";
import DotProxy from "../src/Proxy/DotProxy";
import Kernel from "../src/Kernel/Kernel";
import {power} from "../src/Numeric/Counting/Operations";

DefaultKernel.extend(MU);

const Xa = C('a');
const Xb = C('b');
const Xc = C('c');

const sum = c(1);
const product = c(2);

// let r1 = DefaultKernel.run(
//     specMU(
//         'test-C',
//         O([
//             tag(Xa, Xb)
//         ]),
//         specConfigurations([
//             {
//                 pattern: O([
//                     tag(Xa, Proxy)
//                 ]),
//                 instruction: specopC2(specRef(Xa), Xc)
//             }
//         ])
//     )
// );
//
// Debug.logStructure(r1);

function specAdd (name: string, a: Entity, b: Entity, r: Entity) : Entity
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

function specopAdd (a : Entity, b : Entity, r : Entity) : Entity
{
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(sum, r)
    )
}

// let r2 = DefaultKernel.run(
//     specMU(
//         'test-H1c',
//         specAdd('1 + 2', c(1), c(2), Proxy),
//         specConfigurations([
//             {
//                 pattern: specAdd('s0a', Proxy, Proxy, DotProxy),
//                 instruction: specopAdd(
//                     Proxy,
//                     specRef(op2),
//                     specRef(op1)
//                 )
//             },
//             {
//                 pattern: specAdd('s1a', DotProxy, not0, Proxy),
//                 instruction: specopAdd(
//                     Proxy,
//                     specopiH0(specRef(op2)),
//                     specopH0(specRef(sum))
//                 )
//             },
//             {
//                 pattern: specAdd('s2a', Proxy, DefaultKernel.dot(c0), Proxy),
//                 instruction: specopAdd(
//                     Proxy,
//                     Proxy,
//                     specRef(sum)
//                 )
//             },
//         ])
//     )
// );
//
// Debug.logStructure(r2);

export function specMult (name: string, a: Entity, b: Entity, r: Entity) : Entity
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

function specopMult (a : Entity, b : Entity, r : Entity) : Entity
{
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(product, r)
    )
}

const addMultConfigs = specConfigurations([
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
        pattern: specAdd('s2a', Proxy, DefaultKernel.dot(c0), Proxy),
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
        pattern: specMult('s2m', Proxy, DefaultKernel.dot(c0), Proxy),
        instruction: specopMult(
            Proxy,
            Proxy,
            specRef(product)
        )
    },
]);

// let r3 = DefaultKernel.run(
//     specMU(
//         'test-H1c',
//         specMult('6 * 4', c(6), c(4), Proxy),
//         addMultConfigs
//     )
// );
//
// Debug.logStructure(r3);
//
// console.log(X(X(r3, result), product));

const MHx = new Kernel();
const opx = C('opx');
const opxi = C('opxi');
const [state, [state1, state2, state3]] = MHx.label('state', ['state1', 'state2', 'state3']);

function specHx (name: string, a : Entity, b : Entity, x : Entity,  xi : Entity, c : Entity, i : Entity, s : Entity) {
    return C(name, [
        tag(op1, a),
        tag(op2, b),
        tag(opx, x),
        tag(opxi, xi),
        tag(configurations, c),
        tag(index, i),
        tag(state, s)
    ]);
}

MHx.state(
    specHx('Hx0', Proxy, Proxy, Proxy, Proxy, DotProxy, Proxy, DotProxy)
).relation(
    (s) => {
        return specHx(
            'R(Hx0)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(s, opx),
            C('configurations'),
            c0,
            state1
        );
    }
);

function specHxOp (a : Entity, b : Entity, r : Entity, x : Entity) {
    return O([
        tag(op1, a),
        tag(op2, b),
        tag(x, r),
    ]);
}

function specopHx (a : Entity, b : Entity, r : Entity, x : Entity) {
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(x, r),
    );
}

MHx.state(
    specHx('Hx:s1:3+', Proxy, Proxy, Proxy, c(3), Proxy, Proxy, state1)
).relation(
    (s) => {
        return specHx(
            'R(Hx:s1:3+)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, Proxy, DotProxy, X(s, opxi))),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specRef(op2),
                        c1,
                        X(s, opxi)
                    )),
                ]
            )),
            H0(X(s, index)),
            state2
        );
    }
);

MHx.state(
    specHx('Hx:s1:2', Proxy, Proxy, Proxy, c(2), Proxy, Proxy, state1)
).relation(
    (s) => {
        return specHx(
            'R(Hx:s1:1+)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, Proxy, DotProxy, X(s, opxi))),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specRef(op2),
                        c0,
                        X(s, opxi)
                    )),
                ]
            )),
            H0(X(s, index)),
            state2
        );
    }
);

MHx.state(
    specHx('Hx:s1:1', Proxy, Proxy, Proxy, c1, Proxy, Proxy, state1)
).relation(
    (s) => {
        return specHx(
            'R(Hx:s1:1+)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, Proxy, DotProxy, X(s, opxi))),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specRef(op2),
                        specRef(op1),
                        X(s, opxi)
                    )),
                ]
            )),
            H0(X(s, index)),
            state2
        );
    }
);

MHx.state(
    specHx('Hx:s2:2+', Proxy, Proxy, Proxy, c(2), Proxy, Proxy, state2)
).relation(
    (s) => {
        return specHx(
            'R(Hx:s2:2+)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, not0, Proxy, X(s, opxi))),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specopiH0(specRef(op2)),
                        specopX(
                            specEval(
                                specopHx(
                                    specRef(op1),
                                    specRef(X(s, opxi)),
                                    Proxy,
                                    iH0(X(s, opxi))
                                )
                            ),
                            iH0(X(s, opxi))
                        ),
                        X(s, opxi)
                    )),
                ]
            )),
            H0(X(s, index)),
            state3
        );
    }
);

MHx.state(
    specHx('Hx:s2:1', Proxy, Proxy, Proxy, c1, Proxy, Proxy, state2)
).relation(
    (s) => {
        return specHx(
            'R(Hx:s2:1)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, not0, Proxy, X(s, opxi))),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specopiH0(specRef(op2)),
                        specopH0(specRef(X(s, opxi))),
                        X(s, opxi)
                    )),
                ]
            )),
            H0(X(s, index)),
            state3
        );
    }
);

MHx.state(
    specHx('Hx:s3', Proxy, Proxy, Proxy, not0, Proxy, Proxy, state3)
).relation(
    (s) => {
        return specHx(
            'R(Hx:s3)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            iH0(X(s, opxi)),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, c0, Proxy, X(s, opxi))),
                    tag(instruction, specopHx(
                        Proxy,
                        Proxy,
                        specRef(X(s, opxi)),
                        X(s, opxi)
                    )),
                ]
            )),
            H0(X(s, index)),
            state1
        );
    }
);

MHx.state(
    specHx('HxMU', Proxy, Proxy, Proxy, dot(c0), Proxy, Proxy, Proxy)
).relation(
    (s) => {
        return specMU(
            'R',
            O([
                tag(op1, X(s, op1)),
                tag(op2, X(s, op2)),
                tag(X(s, opx), Proxy),
                Proxy
            ]),
            X(s, configurations)
        )
    }
);

DefaultKernel.extend(MHx);

let r4 = DefaultKernel.run(
    specHx('R(test)', c(3), c(2), c(4), Proxy, Proxy, Proxy, Proxy)
);

Debug.logStructure(r4);
