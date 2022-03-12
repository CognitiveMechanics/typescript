
import {O, C} from "../src/Kernel/DefaultKernel";
import {Ystar, YstarB, Q, abstract, flattenEntity, stringEntity, permute} from "../src/Entropy/Entropy";
import Debug from "../src/Debug/Debug";
import Entity from "../src/Entity/Entity";

const a = C('a');
const b = C('b');
const c = C('c');

const d = C('d', [a, b]);
const e = C('e', [b, a]);
const f = C('f', [a, c]);
const g = C('g', [a]);
const h = C('h', [f, d]);
const i = C('i', [f, d, g]);

console.log(flattenEntity(f));
console.log(stringEntity(d));
console.log(stringEntity(e));
console.log(stringEntity(f));
console.log(stringEntity(h));

console.log('Ystar');

console.log('0', Ystar([d, e]));
console.log('2', Ystar([d, f]));
console.log('2', Ystar([e, f]));
console.log('<2', Ystar([d, e, f]));
console.log('1', Ystar([d, g]));

console.log('YstarB');

console.log('0', YstarB([d], e));
console.log('1', YstarB([d], f));
console.log('0', YstarB([d], g));
console.log('1', YstarB([g], d));

console.log('Q');

console.log('1', Q(e, [d, e]));
console.log('1', Q(d, [d, e, a]));
console.log('.5', Q(g, [d, e]));

console.log(require('util').inspect(abstract([d, e]), {showHidden: false, depth: 3}));
console.log(require('util').inspect(abstract([d, e, f]), {showHidden: false, depth: 3}));
