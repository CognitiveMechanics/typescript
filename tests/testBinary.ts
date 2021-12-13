import {Mb, specb, state, begin, iter, carry, end, digits} from '../src/Numeric/Binary/Machine';
import {c, c0, c1, iH0} from '../src/Numeric/Core';
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";

// console.log(state, begin, iter, carry, end);
//
// console.log('M(iter, state)', Mb.match(iter, state));
// console.log('M(iter, begin)', Mb.match(iter, begin));
//
// console.log(Mb.dot(c(0)));
// console.log(Mb.dot(c(1)));
//
// console.log('M(1, 0)', Mb.match(c1, c0));
// console.log('M(1, •0•)', Mb.match(c1, Mb.dot(c0)));

const s = specb('4', begin, c(9), Proxy, Proxy, Proxy);
const result = Mb.run(s);

Debug.logStructure(Mb.extract(result, digits));