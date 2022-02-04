
import {MU, op1, op2, op3, specMU, specConfigurations, specRef} from '../src/Universal/Machine';
import {C, O, DefaultKernel, k, Y, tag} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import {specopC2, specopC3, specopH0, specopiH0, specopk} from "../src/Universal/Operations";
import {c, c0, c1, not0} from "../src/Numeric/Core";
import Entity from "../src/Entity/Entity";

DefaultKernel.extend(MU);

let Xa = C('a');
let Xb = C('b');
let Xc = C('c');

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

export function specAdd (name: string, a: Entity, b: Entity, r: Entity) : Entity
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(op3, r),
        ]
    );
}

let r2 = DefaultKernel.run(
    specMU(
        'test-add',
        specAdd('1 + 2', c(1), c(2), Proxy),
        specConfigurations([
            {
                pattern: specAdd('s0', not0, Proxy, Proxy),
                instruction: specopC3(
                    specopC2(specopk(op1), specopiH0(specRef(op1))),
                    specopC2(specopk(op2), specopH0(specRef(op2))),
                    specopC2(specopk(op3), Proxy)
                )
            },
            {
                pattern: specAdd('s1', DefaultKernel.dot(c0), Proxy, Proxy),
                instruction: specopC3(
                    specopC2(specopk(op1), Proxy),
                    specopC2(specopk(op2), Proxy),
                    specopC2(specopk(op3), specRef(op2))
                )
            }
        ])
    )
);

Debug.logStructure(r2);