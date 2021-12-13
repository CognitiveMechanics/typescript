
import Composer from '../src/Composer/DefaultComposer';
import Matcher from '../src/Matcher/DefaultMatcher';
import Entity from '../src/Entity/Entity';
import Proxy from '../src/Proxy/Proxy';
import DotProxy from '../src/Proxy/DotProxy';

const composer = new Composer;
const matcher = new Matcher;

const C = (a : Array<Entity>) => composer.compose(a);
const Y = (a : Entity, b : Entity) => matcher.match(a, b);

const physicalObject = C([]);
const hasLegs = C([]);
const canApplyForce = C([]);
const nameBob = C([]);

const kicker = C([hasLegs, canApplyForce]);
const kickee = C([physicalObject]);
const Bob = C([hasLegs, canApplyForce, nameBob]);
const ball = C([physicalObject]);

console.log('Y(Bob, kicker)', Y(Bob, kicker));
console.log('Y(ball, kicker)', Y(ball, kicker));
console.log('Y(Bob, kickee)', Y(Bob, kickee));
console.log('Y(ball, kickee)', Y(ball, kickee));
console.log('Y(Bob, [])', Y(Bob, Proxy));
console.log('Y(ball, [])', Y(ball, Proxy));
console.log('Y([], [])', Y(Proxy, Proxy));
console.log('Y([], [.])', Y(Proxy, DotProxy));