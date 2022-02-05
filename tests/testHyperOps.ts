import {begin, Mc0, numeral, specc0, state} from '../src/Numeric/Counting/Machine';
import {Mr, specr1, structure, tag, times} from '../src/Repeater/Machine';
import {c, c0} from '../src/Numeric/Core';
import {DefaultKernel, X} from "../src/Kernel/DefaultKernel";
import {add, Mc1, Mc2, Mc3, mult, exp, sub} from "../src/Numeric/Counting/Operations";
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

console.log('0 + 0 = 0', add(c(0), c(0)));
console.log('0 + 1 = 1', add(c(0), c(1)));
console.log('1 + 0 = 1', add(c(1), c(0)));
console.log('1 + 1 = 2', add(c(1), c(1)));
console.log('2 + 0 = 2', add(c(2), c(0)));
console.log('2 + 2 = 4', add(c(2), c(2)));
console.log('12 + 23 = 35', add(c(12), c(23)));

console.log('0 * 0 = 0', mult(c(0), c(0)));
console.log('0 * 1 = 0', mult(c(0), c(1)));
console.log('1 * 0 = 0', mult(c(1), c(0)));
console.log('1 * 1 = 1', mult(c(1), c(1)));
console.log('2 * 1 = 2', mult(c(2), c(1)));
console.log('2 * 2 = 4', mult(c(2), c(2)));
console.log('2 * 3 = 6', mult(c(2), c(3)));
console.log('12 * 23 = 276', mult(c(12), c(23)));

console.log('1 ^ 0 = 1', exp(c(1), c(0)));
console.log('4 ^ 0 = 1', exp(c(4), c(0)));
console.log('4 ^ 1 = 4', exp(c(4), c(1)));
console.log('2 ^ 3 = 8', exp(c(2), c(3)));
console.log('3 ^ 2 = 9', exp(c(3), c(2)));

console.log('0 - 0 = 0', sub(c(0), c(0)));
console.log('1 - 0 = 1', sub(c(1), c(0)));
console.log('1 - 1 = 0', sub(c(1), c(1)));
console.log('2 - 1 = 1', sub(c(2), c(1)));
console.log('7 - 3 = 4', sub(c(7), c(3)));
console.log('2 - 5 = -3', sub(c(2), c(5)));
