
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
console.log('6', Ystar([d, f]));
console.log('6', Ystar([e, f]));
console.log('<6', Ystar([d, e, f]));
console.log('3', Ystar([d, g]));

console.log('YstarB');

console.log('0', YstarB([d], e));
console.log('3', YstarB([d], f));
console.log('0', YstarB([d], g));
console.log('3', YstarB([g], d));

console.log('Q');

console.log('1', Q([d, e], e));
console.log('1', Q([d, e, a], d));
console.log('.5', Q([d, e], g));

console.log('abstract([d,e])');
Debug.logDeep(abstract([d, e]).map(x => stringEntity(x.entity)));

console.log('abstract([d,f])');
Debug.logDeep(abstract([d, f]).map(x => stringEntity(x.entity)));

console.log('abstract([d,e,f])');
Debug.logDeep(abstract([d, e, f]).map(x => stringEntity(x.entity)));

console.log('abstract([d,e,h])');
Debug.logDeep(abstract([d, e, h]).map(x => stringEntity(x.entity)));

console.log('abstract([d,f,h])');
Debug.logDeep(abstract([d, f, h]).map(x => stringEntity(x.entity)));
