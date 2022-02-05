
import {C, X, T} from "../src/Kernel/DefaultKernel";
import Debug from "../src/Debug/Debug";
import {c, eq, gteq, c0, H0, iH0, num} from "../src/Numeric/Core";
import Entity from "../src/Entity/Entity";

const seq = C('<>', []);

const seq1 = T(seq, c(0), c(1));
const seq2 = T(seq1, c(1), c(1));

Debug.logStructure(seq1);
Debug.logStructure(seq2);
Debug.logStructure(X(seq2, c(0)));
Debug.logStructure(X(seq2, c(1)));

console.log('0', c(0));
console.log('4', c(4));
console.log('4 >= 4', gteq(c(4), c(4)));
console.log('4 >= 3', gteq(c(4), c(3)));
console.log('4 >= 5', gteq(c(4), c(5)));
console.log('4 = 4', eq(c(4), c(4)));
console.log('4 = 3', eq(c(4), c(3)));
console.log('4 = 5', eq(c(4), c(5)));
console.log('4 === 4', c(4) === c(4));
console.log('0 === 0', c(0) === c0);

console.log('H0(0) == 1', H0(c(0)) === c(1));
console.log('H0(H0(0)) == 2', H0(H0(c(0))) === c(2));
console.log('iH0(1) == 0', iH0(c(1)) === c(0));
console.log('iH0(iH0(2)) == 0', iH0(iH0(c(2)) as Entity) === c(0));

