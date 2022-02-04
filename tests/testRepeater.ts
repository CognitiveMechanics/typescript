import {Mc0, specc0, begin, state, numeral} from '../src/Numeric/Counting/Machine';
import {Mr, specr1, structure, times} from '../src/Repeater/Machine';
import {c} from '../src/Numeric/Core';
import {DefaultKernel, X} from "../src/Kernel/DefaultKernel";

DefaultKernel.extend(Mc0);
DefaultKernel.extend(Mr);

const s0 = specc0('3', begin, c(0)); // 3^0 = 1
const s1 = specr1('r1', s0, c(3), state, begin); // 3^1 = 3
const s2 = specr1('r2', s1, c(3), times, c(3)); // 3^2 = 9
const s3 = specr1('r3', s2, c(3), times, c(3)); // 3^3 = 27
const s4 = specr1('r4', s3, c(3), times, c(3)); // 3^4 = 81

const r0 = DefaultKernel.run(s0);
const r1 = DefaultKernel.run(s1);
const r2 = DefaultKernel.run(s2);
const r3 = DefaultKernel.run(s3);
const r4 = DefaultKernel.run(s4);

console.log(
    X(
        r0,
        numeral
    )
);

console.log(
    X(
        X(r1, structure),
        numeral
    )
);

console.log(
    X(
        X(
            X(r2, structure),
            structure
        ),
        numeral
    )
);

console.log(
    X(
        X(
            X(
                X(r3, structure),
                structure
            ),
            structure
        ),
        numeral
    )
);

console.log(
    X(
        X(
            X(
                X(
                    X(r4, structure),
                    structure
                ),
                structure
            ),
            structure
        ),
        numeral
    )
);
