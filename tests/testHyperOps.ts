import {begin, Mc0, numeral, specc0, state} from '../src/Numeric/Counting/Machine';
import {Mr, specr1, structure, tag, times} from '../src/Repeater/Machine';
import {c, c0} from '../src/Numeric/Core';
import {DefaultKernel, X} from "../src/Kernel/DefaultKernel";
import {H1c, Mc1, Mc2, Mc3, H2c, H3c, iH1c, H4c} from "../src/Numeric/Counting/Operations";
import Entity from "../src/Entity/Entity";

DefaultKernel.extend(Mc0);
DefaultKernel.extend(Mc1);
DefaultKernel.extend(Mc2);
DefaultKernel.extend(Mc3);
DefaultKernel.extend(Mr);

// function specadd (a : Entity, b : Entity) {
//     const s0 = specc0('0', begin, a);
//     const s1 = specr1('r1', s0, b, state, begin);
//
//     return s1;
// }
//
// function add1 (a : Entity, b : Entity) {
//     const s1 = specadd(a, b);
//
//     const r = DefaultKernel.run(s1);
//
//     return X(
//         X(r, structure),
//         num
//     );
// }
//
// function mult1 (a : Entity, b : Entity) {
//     const s1 = specr2('r1', specadd(c0, a), b, times, b); // doesn't work because would need to substitute 2 levels down
//     const r = DefaultKernel.run(s1);
//
//     return X(
//         X(
//             X(r, structure),
//             structure
//         ),
//         num
//     );
// }

// console.log('0 + 0 = 0', H1c(c(0), c(0)));
// console.log('0 + 1 = 1', H1c(c(0), c(1)));
// console.log('1 + 0 = 1', H1c(c(1), c(0)));
// console.log('1 + 1 = 2', H1c(c(1), c(1)));
// console.log('2 + 0 = 2', H1c(c(2), c(0)));
// console.log('2 + 2 = 4', H1c(c(2), c(2)));
// console.log('12 + 23 = 35', H1c(c(12), c(23)));
//
// console.log('0 * 0 = 0', H2c(c(0), c(0)));
// console.log('0 * 1 = 0', H2c(c(0), c(1)));
// console.log('1 * 0 = 0', H2c(c(1), c(0)));
// console.log('1 * 1 = 1', H2c(c(1), c(1)));
// console.log('2 * 1 = 2', H2c(c(2), c(1)));
// console.log('2 * 2 = 4', H2c(c(2), c(2)));
// console.log('2 * 3 = 6', H2c(c(2), c(3)));
// console.log('12 * 23 = 276', H2c(c(12), c(23)));
//
// console.log('1 ^ 0 = 1', H3c(c(1), c(0)));
// console.log('4 ^ 0 = 1', H3c(c(4), c(0)));
// console.log('4 ^ 1 = 4', H3c(c(4), c(1)));
// console.log('2 ^ 3 = 8', H3c(c(2), c(3)));
// console.log('3 ^ 2 = 9', H3c(c(3), c(2)));
//
console.log('1 ^^ 0 = 1', H4c(c(1), c(0)));
console.log('4 ^^ 0 = 1', H4c(c(4), c(0)));
console.log('4 ^^ 1 = 4', H4c(c(4), c(1)));
console.log('2 ^^ 3 = 16', H4c(c(2), c(3)));
console.log('3 ^^ 2 = 27', H4c(c(3), c(2)));
console.log('2 ^^ 4 = 65536', H4c(c(2), c(4)));

// console.log('0 - 0 = 0', iH1c(c(0), c(0)));
// console.log('1 - 0 = 1', iH1c(c(1), c(0)));
// console.log('1 - 1 = 0', iH1c(c(1), c(1)));
// console.log('2 - 1 = 1', iH1c(c(2), c(1)));
// console.log('7 - 3 = 4', iH1c(c(7), c(3)));
// console.log('2 - 5 = -3', iH1c(c(2), c(5)));
