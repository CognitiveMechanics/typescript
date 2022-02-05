import Kernel from "../src/Kernel/Kernel";
import Entity from "../src/Entity/Entity";
import {C, tag, X} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";

const MC = new Kernel();
const [state, [begin, end]] = MC.label('state', ['begin', 'end']);
const op1 = C('op1');
const op2 = C('op2');

function specC (name: string, s : Entity, c1 : Entity, c2 : Entity) {
    return C(name,
        [
            tag(state, s),
            tag(op1, c1),
            tag(op2, c2)
        ]
    );
}

MC.state(specC('s0C', begin, Proxy, Proxy))
    .relation((s) => {
        return specC(
            'R(s0C)',
            end,
            Proxy,
            C('C()',
                [
                    X(s, op1),
                    X(s, op2),
                ]
            )
        );
    });

function specMC (c1 : Entity, c2 : Entity) {
    return specC('MC', begin, c1, c2);
}

const a = C('a');
const b = C('b');

const r = MC.run(specMC(a, b));

console.log(r);
Debug.logStructure(r);