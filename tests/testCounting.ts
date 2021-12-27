import {Mc0, specc0, begin, numeral} from '../src/Numeric/Counting/Machine';
import {c} from '../src/Numeric/Core';
import Debug from "../src/Debug/Debug";
import {X} from "../src/Kernel/DefaultKernel";
import Entity from "../src/Entity/Entity";

const s = specc0('4', begin, c(4));
const r = Mc0.run(s, {debug: true, debugTitle: 'Machine'});

Debug.logStructure(r);

console.log('5 === H0(4)', c(5) === X(r, numeral));

// const r1 = Mc0.run(r);
// Debug.logStructure(r1);
//
// console.log('5 === H0(H0(4))', c(5) === Mc0.extract(r1, numeral));
// console.log('6 === H0(H0(4))', c(6) === Mc0.extract(r1, numeral));