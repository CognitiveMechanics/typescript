
// construction

import {C, k, X} from "../Kernel/DefaultKernel";
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import {MU, specUi, evalUi, structure, instruction, result, specMU, configurations} from "./Machine";
import {H0, iH0} from "../Numeric/Core";
import Debug from "../Debug/Debug";

export const opC = C('opC');
export const opT = C('opT');
export const opX = C('opX');
export const opH0 = C('opH0');
export const opiH0 = C('opiH0');
export const opk = C('opk');
export const opEval = C('opEval');
export const opTag = C('opTag');

export const ref = C('ref', []);

export const op = C('Uop', []);
export const op1 = C('Uop1', []);
export const op2 = C('Uop2', []);
export const op3 = C('Uop3', []);
export const op4 = C('Uop4', []);

export function specRef (a : Entity) {
    return C('&' + a.name, [k(ref), a]);
}

export function specopC2 (o1 : Entity, o2 : Entity) {
    return C(
        'opC2',
        [
            C('[op]', [k(op), opC]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
        ]
    );
}

export function specopC3 (o1 : Entity, o2 : Entity, o3 : Entity) {
    return C(
        'opC3',
        [
            C('[op]', [k(op), opC]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
            C('[op3]', [k(op3), o3]),
        ]
    );
}

export function specopC4 (o1 : Entity, o2 : Entity, o3 : Entity, o4 : Entity) {
    return C(
        'opC4',
        [
            C('[op]', [k(op), opC]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
            C('[op3]', [k(op3), o3]),
            C('[op4]', [k(op4), o4]),
        ]
    );
}

export function specopT (o1 : Entity, o2 : Entity, o3 : Entity) {
    return C(
        'opT',
        [
            C('[op]', [k(op), opT]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
            C('[op3]', [k(op3), o3]),
        ]
    );
}

export function specopX (o1 : Entity, o2 : Entity) {
    return C(
        'opX',
        [
            C('[op]', [k(op), opX]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
        ]
    );
}

export function specopH0 (o1 : Entity) {
    return C(
        'opH0',
        [
            C('[op]', [k(op), opH0]),
            C('[op1]', [k(op1), o1]),
        ]
    );
}

export function specopiH0 (o1 : Entity) {
    return C(
        'opiH0',
        [
            C('[op]', [k(op), opiH0]),
            C('[op1]', [k(op1), o1]),
        ]
    );
}

export function specopk (o1 : Entity) {
    return C(
        'opk',
        [
            C('[op]', [k(op), opk]),
            C('[op1]', [k(op1), o1]),
        ]
    );
}

export function specEval (i : Entity) {
    return C(
        'opEval',
        [
            C('[op]', [k(op), opEval]),
            C('[instruction]', [k(instruction), i]),
        ]
    );
}

export function specopTag (o1 : Entity, o2 : Entity) {
    return specopC2(specopk(o1), o2);
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

let i = 0;

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