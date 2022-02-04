
import {C, Y} from '../src/Kernel/DefaultKernel';
import Entity from '../src/Entity/Entity';
import Proxy from '../src/Proxy/Proxy';
import DotProxy from '../src/Proxy/DotProxy';

const physicalObject = C('physical-object', []);
const hasLegs = C('has-legs', []);
const canApplyForce = C('can-apply-force', []);
const nameBob = C('name-Bob', []);

const kicker = C('kicker', [hasLegs, canApplyForce]);
const kickee = C('kickee', [physicalObject]);
const Bob = C('Bob', [hasLegs, canApplyForce, nameBob]);
const ball = C('ball', [physicalObject]);

console.log('Y(Bob, kicker)', Y(Bob, kicker));
console.log('Y(ball, kicker)', Y(ball, kicker));
console.log('Y(Bob, kickee)', Y(Bob, kickee));
console.log('Y(ball, kickee)', Y(ball, kickee));
console.log('Y(Bob, [])', Y(Bob, Proxy));
console.log('Y(ball, [])', Y(ball, Proxy));
console.log('Y([], [])', Y(Proxy, Proxy));
console.log('Y([], [.])', Y(Proxy, DotProxy));