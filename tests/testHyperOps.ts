import {Mc0} from '../src/Numeric/Counting/Machine';
import {Mr} from '../src/Repeater/Machine';
import {c} from '../src/Numeric/Core';
import {DefaultKernel, X$} from "../src/Kernel/DefaultKernel";
import {add, Mc1, Mc2, Mc3, mult, exp} from "../src/Numeric/Counting/Operations";

DefaultKernel.extend(Mc0);
DefaultKernel.extend(Mc1);
DefaultKernel.extend(Mc2);
DefaultKernel.extend(Mc3);
DefaultKernel.extend(Mr);

// function add (a : Entity, b : Entity) {
//     const s0 = specc0('0', begin, a);
//     const s1 = specr('r1', s0, b, state, begin);
//
//     const r = DefaultKernel.run(s1);
//
//     return X$(
//         X$(r, structure),
//         numeral
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
console.log('12 * 23 = 276', mult(c(12), c(23)));

console.log('1 ^ 0 = 1', exp(c(1), c(0)));
console.log('4 ^ 0 = 1', exp(c(4), c(0)));
console.log('4 ^ 1 = 4', exp(c(4), c(1)));
console.log('2 ^ 3 = 8', exp(c(2), c(3)));
console.log('3 ^ 2 = 9', exp(c(3), c(2)));