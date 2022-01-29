import {Md, specd, state, begin, iter, carry, end, digits} from '../src/Numeric/Decimal/Machine';
import {X, Y, dot} from "../src/Kernel/DefaultKernel";
import {c, c0, c1} from '../src/Numeric/Core';
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";

const s = specd('163', begin, c(163), Proxy, Proxy, Proxy);
const result = Md.run(s);

Debug.logStructure(result);
Debug.logStructure(X(result, digits));