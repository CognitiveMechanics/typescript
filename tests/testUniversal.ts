
import {MU, specMU, specConfigurations, specRef} from '../src/Universal/Machine';
import {C, DefaultKernel, k, Y} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import NullEntity from "../src/Entity/NullEntity";
import {specopC} from "../src/Universal/Operations";

DefaultKernel.extend(MU);

let a = C('a', []);
let b = C('b', []);
let c = C('c', []);

let r = DefaultKernel.run(
    specMU(
        'test',
        C(
            'struc',
            [
                C('', [k(a), b])
            ]
        ),
        specConfigurations([
            {
                pattern: C(
                    'struc',
                    [
                        C('', [k(a), b])
                    ]
                ),
                instruction: specopC(specRef(a), c)
            }
        ])
    )
);

Debug.logStructure(r);