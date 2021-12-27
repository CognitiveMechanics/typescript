import {Mb, specb, state, begin, iter, carry, end, digits} from '../src/Numeric/Binary/Machine';
import {c, c0, c1} from '../src/Numeric/Core';
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";

console.log(state, begin, iter, carry, end);

console.log('Y(iter, state)', Mb.match(iter, state));
console.log('Y(iter, begin)', Mb.match(iter, begin));

console.log(Mb.dot(c(0)));
console.log(Mb.dot(c(1)));

console.log('Y(1, 0)', Mb.match(c1, c0));
console.log('Y(1, •0•)', Mb.match(c1, Mb.dot(c0)));

const s = specb('63', begin, c(63), Proxy, Proxy, Proxy);
const result = Mb.run(s);

Debug.logStructure(Mb.extract(result, digits));