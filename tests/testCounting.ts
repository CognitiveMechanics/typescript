import {Mc0, specc0, begin, numeral, state} from '../src/Numeric/Counting/Machine';
import {c} from '../src/Numeric/Core';
import Debug from "../src/Debug/Debug";
import {X, T} from "../src/Kernel/DefaultKernel";
import Entity from "../src/Entity/Entity";

const s = specc0('4', begin, c(4));
const r = Mc0.run(s);

Debug.logStructure(r);

console.log('5 === H0(4)', c(5) === X(r, numeral));

const r1 = Mc0.run(T(r, state, begin));
Debug.logStructure(r1);

console.log('5 === H0(H0(4))', c(5) === X(r1, numeral));
console.log('6 === H0(H0(4))', c(6) === X(r1, numeral));