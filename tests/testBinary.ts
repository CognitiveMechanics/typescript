import {Mb, specb, state, begin, iter, carry, end, digits} from '../src/Numeric/Binary/Machine';
import {X, Y, dot} from "../src/Kernel/DefaultKernel";
import {c, c0, c1} from '../src/Numeric/Core';
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";

console.log(state, begin, iter, carry, end);

console.log('Y(iter, state)', Y(iter, state));
console.log('Y(iter, begin)', Y(iter, begin));

console.log(dot(c(0)));
console.log(dot(c(1)));

console.log('Y(1, 0)', Y(c1, c0));
console.log('Y(1, •0•)', Y(c1, dot(c0)));

const s = specb('63', begin, c(63), Proxy, Proxy, Proxy);
const result = Mb.run(s);

Debug.logStructure(X(result, digits));