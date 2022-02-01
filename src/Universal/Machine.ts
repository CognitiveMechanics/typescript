import Kernel from "../Kernel/Kernel";
import {C, DefaultKernel, k, X, X$, Y} from "../Kernel/DefaultKernel";
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import DotProxy from "../Proxy/DotProxy";
import {anynum, c0, H0, iH0} from "../Numeric/Core";
import NullEntity from "../Entity/NullEntity";
import Debug from "../Debug/Debug";

export const MU = new Kernel;

export const structure = C('structure', []);
export const configurations = C('configurations', []);
export const index = C('index', []);
export const next = C('next', []);
export const pattern = C('pattern', []);
export const instruction = C('instruction', []);
export const result = C('result', []);

export const op = C('op', []);
export const op1 = C('op1', []);
export const op2 = C('op2', []);
export const op3 = C('op3', []);
export const op4 = C('op4', []);

export function specMU (name: string, s : Entity, c : Entity) {
    return specU(name, s, c, Proxy, Proxy, Proxy, Proxy, Proxy);
}

export function specU (name: string, s : Entity, c : Entity, i : Entity, n : Entity, p : Entity, j : Entity, r : Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [k(structure), s]),
            C('[configurations]', [k(configurations), c]),
            C('[index]',[k(index), i]),
            C('[next]', [k(next), n]),
            C('[pattern]', [k(pattern), p]),
            C('[instruction]', [k(instruction), j]),
            C('[result]', [k(result), r]),
        ]
    );
}

export function specUi (name: string, s : Entity, j : Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [k(structure), s]),
            C('[instruction]', [k(instruction), j]),
        ]
    );
}


// init

MU.state(
    specU('sU0', Proxy, Proxy, DotProxy, DotProxy, Proxy, DotProxy, DotProxy)
).relation((s) => {
    console.log('init')
    return specU(
        'R(sU0)',
        X$(s, structure),
        X$(s, configurations),
        c0,
        X(X$(s, configurations), c0, Proxy) as Entity,
        NullEntity,
        Proxy,
        Proxy
    )
});

// stop if there is no next instruction

MU.state(
    specU('sU1', Proxy, Proxy, anynum, DotProxy, Proxy, Proxy, Proxy)
).relation((s) => {
    console.log('no next stop')
    return specU(
        'R(sU1)',
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        X$(s, structure)
    )
});

// set pattern

MU.state(
    specU('sU2', Proxy, Proxy, anynum, Proxy, NullEntity, DotProxy, DotProxy)
).relation((s) => {
    console.log('set pattern')
    return specU(
        'R(sU2)',
        X$(s, structure),
        X$(s, configurations),
        H0(X$(s, index)),
        X(X$(s, configurations), c0, Proxy) as Entity,
        Y(X$(s, structure), X$(X$(X$(s, configurations), X$(s, index)), pattern)),
        Proxy,
        Proxy
    )
});

// if pattern is set, set instruction

MU.state(
    specU('sU3', Proxy, Proxy, anynum, Proxy, Proxy, DotProxy, DotProxy)
).relation((s) => {
    console.log('set inst')
    Debug.logStructure(s);
    return specU(
        'R(sU3)',
        X$(s, structure),
        X$(s, configurations),
        c0,
        X(X$(s, configurations), c0, Proxy) as Entity,
        NullEntity,
        X$(X$(X$(s, configurations), iH0(X$(s, index))), instruction),
        Proxy
    )
});

// execute instruction

MU.state(
    specU('sU4', Proxy, Proxy, anynum, Proxy, Proxy, Proxy, DotProxy)
).relation((s) => {
    console.log('exec')
    return specU(
        'R(sU4)',
        DefaultKernel.run(
            specUi(
                'sUi',
                X$(s, structure),
                X$(X$(X$(s, configurations), iH0(X$(s, index))), instruction)
            )
        ),
        X$(s, configurations),
        c0,
        Proxy,
        NullEntity,
        Proxy,
        Proxy
    )
});

// construction

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

MU.state(
    specUi('C', Proxy, specopC(Proxy, Proxy))
).relation((s) => {
    console.log('here');

   return MU.compose(
       'R(C)',
       [
           X$(X$(s, instruction), op1),
           X$(X$(s, instruction), op2),
       ]
   )
});
