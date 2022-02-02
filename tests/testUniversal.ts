
import {MU, specMU, specConfigurations, specRef} from '../src/Universal/Machine';
import {C, O, DefaultKernel, k, Y, tag} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import {specopC} from "../src/Universal/Operations";

DefaultKernel.extend(MU);

let a = C('a');
let b = C('b');
let c = C('c');

let r = DefaultKernel.run(
    specMU(
        'test',
        O([
            tag(a, b)
        ]),
        specConfigurations([
            {
                pattern: O([
                    tag(a, Proxy)
                ]),
                instruction: specopC(specRef(a), c)
            }
        ])
    )
);

Debug.logStructure(r);