
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

let r1 = DefaultKernel.run(
    specMU(
        'test-C',
        O([
            tag(Xa, Xb)
        ]),
        specConfigurations([
            {
                pattern: O([
                    tag(Xa, Proxy)
                ]),
                instruction: specopC2(specRef(Xa), Xc)
            }
        ])
    )
);

Debug.logStructure(r1);

const MHx = new Kernel();
const opx = C('opx');
const opxi = C('opxi');
const [state, [state1, state2, state3]] = MHx.label('state', ['state1', 'state2', 'state3']);

function specHx (name: string, a : Entity, b : Entity, x : Entity, c : Entity, r : Entity) {
    return C(name, [
        tag(op1, a),
        tag(op2, b),
        tag(opx, x),
        tag(configurations, c),
        tag(result, r),
    ]);
}


function specHxc (name: string, xi : Entity, c : Entity, i : Entity, s : Entity) {
    return C(name, [
        tag(opxi, xi),
        tag(configurations, c),
        tag(index, i),
        tag(state, s)
    ]);
}

MHx.state(
    specHx('Hx0', Proxy, Proxy, Proxy, DotProxy, DotProxy)
).relation(
    (s) => {
        return specHx(
            'R(Hx0)',
            X(s, op1),
            X(s, op2),
            X(s, opx),
            X(MHx.run(
                specHxc('R(Hxc)', X(s, opx), C('configurations'), c0, state1)
            ), configurations),
            Proxy
        );
    }
);

function specHxOp (a : Entity, b : Entity, x : Entity, r : Entity) {
    return O([
        tag(op1, a),
        tag(op2, b),
        tag(x, r),
    ]);
}

function specopHx (a : Entity, b : Entity, x : Entity,  r : Entity) {
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(x, r),
    );
}

MHx.state(
    specHxc('Hx:s1:3+', c(3), Proxy, Proxy, state1)
).relation(
    (s) => {
        return specHxc(
            'R(Hx:s1:3+)',
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, Proxy, X(s, opxi), DotProxy)),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specRef(op2),
                        X(s, opxi),
                        c1
                    )),
                ]
            )),
            H0(X(s, index)),
            state2
        );
    }
);

MHx.state(
    specHxc('Hx:s1:2', c(2), Proxy, Proxy, state1)
).relation(
    (s) => {
        return specHxc(
            'R(Hx:s1:1+)',
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, Proxy, X(s, opxi), DotProxy)),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specRef(op2),
                        X(s, opxi),
                        c0
                    )),
                ]
            )),
            H0(X(s, index)),
            state2
        );
    }
);

MHx.state(
    specHxc('Hx:s1:1', c1, Proxy, Proxy, state1)
).relation(
    (s) => {
        return specHxc(
            'R(Hx:s1:1+)',
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, Proxy, X(s, opxi), DotProxy)),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specRef(op2),
                        X(s, opxi),
                        specRef(op1)
                    )),
                ]
            )),
            H0(X(s, index)),
            state2
        );
    }
);

MHx.state(
    specHxc('Hx:s2:2+', c(2), Proxy, Proxy, state2)
).relation(
    (s) => {
        return specHxc(
            'R(Hx:s2:2+)',
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, not0, X(s, opxi), Proxy)),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specopiH0(specRef(op2)),
                        X(s, opxi),
                        specopX(
                            specEval(
                                specopHx(
                                    specRef(op1),
                                    specRef(X(s, opxi)),
                                    iH0(X(s, opxi)),
                                    Proxy
                                )
                            ),
                            iH0(X(s, opxi))
                        )
                    )),
                ]
            )),
            H0(X(s, index)),
            state3
        );
    }
);

MHx.state(
    specHxc('Hx:s2:1', c1, Proxy, Proxy, state2)
).relation(
    (s) => {
        return specHxc(
            'R(Hx:s2:1)',
            X(s, opxi),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, not0, X(s, opxi), Proxy)),
                    tag(instruction, specopHx(
                        specRef(op1),
                        specopiH0(specRef(op2)),
                        X(s, opxi),
                        specopH0(specRef(X(s, opxi)))
                    )),
                ]
            )),
            H0(X(s, index)),
            state3
        );
    }
);

MHx.state(
    specHxc('Hx:s3', not0, Proxy, Proxy, state3)
).relation(
    (s) => {
        return specHxc(
            'R(Hx:s3)',
            iH0(X(s, opxi)),
            T(X(s, configurations), X(s, index), C(
                '[configuration]',
                [
                    tag(pattern, specHxOp(Proxy, c0, X(s, opxi), Proxy)),
                    tag(instruction, specopHx(
                        Proxy,
                        Proxy,
                        X(s, opxi),
                        specRef(X(s, opxi))
                    )),
                ]
            )),
            H0(X(s, index)),
            state1
        );
    }
);

MHx.state(
    specHx('HxMU', Proxy, Proxy, Proxy, Proxy, DotProxy)
).relation(
    (s) => {
        return specHx(
            'R(HxMU)',
            Proxy,
            Proxy,
            Proxy,
            Proxy,
            X(X(MU.run(specMU(
                'R',
                O([
                    tag(op1, X(s, op1)),
                    tag(op2, X(s, op2)),
                    tag(X(s, opx), Proxy),
                    Proxy
                ]),
                X(s, configurations)
            )), result), X(s, opx))
        )
    }
);

DefaultKernel.extend(MHx);

let r4 = DefaultKernel.run(
    specHx('R(test)', c(2), c(3), c(2), Proxy, Proxy)
);

console.log(X(r4, result));
