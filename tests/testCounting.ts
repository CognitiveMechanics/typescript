import {Mc0, specc0, begin, numeral} from '../src/Numeric/Counting/Machine';
import {c} from '../src/Numeric/Core';
import Debug from "../src/Debug/Debug";
import Entity from "../src/Entity/Entity";

const s = specc0('4', begin, c(4));
const r = Mc0.run(s);
const r1 = Mc0.run(Mc0.extract(r, numeral) as Entity);

Debug.logStructure(r);

console.log('5 === H0(4)', c(5) === Mc0.extract(r, numeral));
console.log('5 === H0(H0(4))', c(5) === Mc0.extract(r1, numeral));
console.log('6 === H0(H0(4))', c(6) === Mc0.extract(r1, numeral));