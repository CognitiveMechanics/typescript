
import Composer from '../src/Composer/DefaultComposer';
import Matcher from '../src/Matcher/DefaultMatcher';
import Entity from '../src/Entity/Entity';
import Proxy from '../src/Proxy/Proxy';
import DotProxy from '../src/Proxy/DotProxy';

const composer = new Composer;
const matcher = new Matcher;

const C = (a : string, b: Array<Entity>) => composer.compose(a, b);
const Y = (a : Entity, b : Entity) => matcher.match(a, b);

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