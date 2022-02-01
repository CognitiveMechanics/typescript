
import {MU, pattern, instruction, specMU, specopC} from '../src/Universal/Machine';
import {C, DefaultKernel, k, Y} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import NullEntity from "../src/Entity/NullEntity";
import {c0} from "../src/Numeric/Core";

DefaultKernel.extend(MU);

let A = C('A', []);
let B = C('B', []);

let r = DefaultKernel.run(
    specMU(
        'test',
        NullEntity,
        C(
            'instructions',
            [
                C(
                    'i0',
                    [
                        k(c0),
                        C(
                            '[configuration]',
                            [
                                C('[pattern]', [k(pattern), Proxy]),
                                C('[instruction]', [k(instruction), specopC(A, B)]),
                            ]
                        )
                    ]
                )
            ]
        )
    )
);

Debug.logStructure(r);