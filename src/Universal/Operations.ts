
// construction

import {C, k, X, tag} from "../Kernel/DefaultKernel";
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import {MU, specUi, evalUi, structure, instruction, result, specMU, configurations} from "./Machine";
import {c, H0, iH0} from "../Numeric/Core";
import Debug from "../Debug/Debug";
import NullEntity from "../Entity/NullEntity";

export const op = C('Uop');
export const op1 = C('Uop1');
export const op2 = C('Uop2');
export const op3 = C('Uop3');
export const op4 = C('Uop4');


// refs

export const ref = C('ref');

export function specRef (a : Entity) {
    return C('&' + a.name, [k(ref), a]);
}

MU.state(
    specUi('ref', Proxy, Proxy, specRef(Proxy))
).relation((s) => {
    return specUi('!ref', X(s, structure), X(s, configurations), X(
        X(s, structure),
        X(
            C('', [X(s, instruction)]),
            ref
        )
    ));
});

// construction

let i = 0;
export const opC = C('opC');

// C4

export function specopC4 (o1 : Entity, o2 : Entity, o3 : Entity, o4 : Entity) {
    return C(
        'opC4',
        [
            tag(op, opC),
            tag(op1, o1),
            tag(op2, o2),
            tag(op3, o3),
            tag(op4, o4),
        ]
    );
}

MU.state(
    specUi('C4', Proxy, Proxy, specopC4(Proxy, Proxy, Proxy, Proxy))
).relation((s) => {
    return specUi('!C4', X(s, structure), X(s, configurations), MU.compose(
        'R(C4):' + (i++),
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
            ),
            evalUi(
                X(s, structure),
                X(s, configurations),
                X(X(s, instruction), op4)
            )
        ]
    ));
});

// C3

export function specopC3 (o1 : Entity, o2 : Entity, o3 : Entity) {
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

MU.state(
    specUi('C3', Proxy, Proxy, specopC3(Proxy, Proxy, Proxy))
).relation((s) => {
    return specUi('!C3', X(s, structure), X(s, configurations), MU.compose(
        'R(C3):' + (i++),
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
    ));
});

// C2

export function specopC2 (o1 : Entity, o2 : Entity) {
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
    return specUi('!C2', X(s, structure), X(s, configurations), MU.compose(
        'R(C2):' + (i++),
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
    ));
});

// tag

export const opTag = C('opTag');

export function specopTag (o1 : Entity, o2 : Entity) {
    return specopC2(specopk(o1), o2);
}

// X

export const opX = C('opX');

export function specopX (o1 : Entity, o2 : Entity) {
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
    return specUi('!X', X(s, structure), X(s, configurations), X(
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
    ));
});

// T

export const opT = C('opT');

export function specopT (o1 : Entity, o2 : Entity, o3 : Entity) {
    return C(
        'opT',
        [
            tag(op, opT),
            tag(op1, o1),
            tag(op2, o2),
            tag(op3, o3),
        ]
    );
}

MU.state(
    specUi('T', Proxy, Proxy, specopT(Proxy, Proxy, Proxy))
).relation((s) => {
    return specUi('!T', X(s, structure), X(s, configurations), MU.transclude(
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
    ))
});


// H0

export const opH0 = C('opH0');

export function specopH0 (o1 : Entity) {
    return C(
        'opH0',
        [
            tag(op, opH0),
            tag(op1, o1),
        ]
    );
}

MU.state(
    specUi('H0', Proxy, Proxy, specopH0(Proxy))
).relation((s) => {
    return specUi('!H0', X(s, structure), X(s, configurations), H0(
        evalUi(
            X(s, structure),
            X(s, configurations),
            X(X(s, instruction), op1)
        )
    ));
});

// iH0

export const opiH0 = C('opiH0');

export function specopiH0 (o1 : Entity) {
    return C(
        'opiH0',
        [
            tag(op, opiH0),
            tag(op1, o1),
        ]
    );
}

MU.state(
    specUi('iH0', Proxy, Proxy, specopiH0(Proxy))
).relation((s) => {
    return specUi('!iH0', X(s, structure), X(s, configurations), iH0(
        evalUi(
            X(s, structure),
            X(s, configurations),
            X(X(s, instruction), op1)
        )
    ));
});

// k

export const opk = C('opk');

export function specopk (o1 : Entity) {
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
    return specUi('!k', X(s, structure), X(s, configurations), k(
        evalUi(
            X(s, structure),
            X(s, configurations),
            X(X(s, instruction), op1)
        )
    ));
});

// eval

export const opEval = C('opEval');

export function specEval (i : Entity) {
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
    console.log("EVAL");
    Debug.logStructure(X(s, structure));

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
