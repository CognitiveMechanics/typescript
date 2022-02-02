
// construction

import {C, k, X$} from "../Kernel/DefaultKernel";
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import {instruction, MU, op, op1, op2, ref, specRef, specUi, structure} from "./Machine";
import Debug from "../Debug/Debug";

export const opC = C('opC', []);

export function specopC (o1 : Entity, o2 : Entity) {
    return C(
        'opC',
        [
            C('[op]', [k(op), opC]),
            C('[op1]', [k(op1), o1]),
            C('[op2]', [k(op2), o2]),
        ]
    );
}

export function evalUi (s : Entity, i : Entity) {
    return X$(MU.run(
        specUi('refmatch', s, i)
    ), instruction);
}

MU.state(
    specUi('ref', Proxy, specRef(Proxy))
).relation((s) => {
    console.log(X$(s, structure));
    return specUi(
        '',
        Proxy,
        X$(
            X$(s, structure),
            X$(
                C('', [X$(s, instruction)]),
                ref
            )
        )
    );
});


MU.state(
    specUi('C', Proxy, specopC(Proxy, Proxy))
).relation((s) => {
    return MU.compose(
        'R(C)',
        [
            evalUi(
                X$(s, structure),
                X$(X$(s, instruction), op1)
            ),
            evalUi(
                X$(s, structure),
                X$(X$(s, instruction), op2)
            )
        ]
    )
});