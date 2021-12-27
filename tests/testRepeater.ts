import {Mc0, specc0, begin, state, numeral} from '../src/Numeric/Counting/Machine';
import {Mr, specr, structure, times} from '../src/Repeater/Machine';
import {c} from '../src/Numeric/Core';
import Debug from "../src/Debug/Debug";
import {DefaultKernel} from "../src/Kernel/DefaultKernel";
import Entity from "../src/Entity/Entity";

DefaultKernel.extend(Mc0);
DefaultKernel.extend(Mr);

const s0 = specc0('3', begin, c(0)); // 3
const s1 = specr('r1', s0, c(3), state, begin); // 3 + 3 = 6
const s2 = specr('r2', s1, c(3), times, c(3)); // 3 * 3 = 12
const s3 = specr('r3', s2, c(3), times, c(3)); // 3^3 = 12

// const r1 = DefaultKernel.run(s1);
// const r2 = DefaultKernel.run(s2);
const r = DefaultKernel.run(s0, {debug: true, debugTitle: null});

// Debug.logStructure(
//     Mr.extract(
//         Mr.extract(r1, structure) as Entity,
//         numeral
//     )
// );
//
// Debug.logStructure(
//     Mr.extract(
//         Mr.extract(
//             Mr.extract(r2, structure) as Entity,
//             structure
//         ) as Entity,
//         numeral
//     )
// );
//
// Debug.logStructure(
//     Mr.extract(
//         Mr.extract(
//             Mr.extract(
//                 Mr.extract(r3, structure) as Entity,
//                 structure
//             ) as Entity,
//             structure
//         ) as Entity,
//         numeral
//     )
// );

Debug.logStructure(r);