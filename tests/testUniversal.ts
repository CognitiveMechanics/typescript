
import {MU, specMU, specopC, specConfigurations} from '../src/Universal/Machine';
import {C, DefaultKernel, k, Y} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import NullEntity from "../src/Entity/NullEntity";

DefaultKernel.extend(MU);

let A = C('A', []);
let B = C('B', []);

let r = DefaultKernel.run(
    specMU(
        'test',
        NullEntity,
        specConfigurations([
            {
                pattern: Proxy,
                instruction: specopC(A, B)
            }
        ])
    )
);

Debug.logStructure(r);