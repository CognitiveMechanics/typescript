
import Composer from '../src/Composer/DefaultComposer';
import Extractor from '../src/Extractor/DefaultExtractor';
import Transcluder from '../src/Transcluder/DefaultTranscluder';
import Entity from '../src/Entity/Entity';
import Proxy from '../src/Proxy/Proxy';
import Debug from "../src/Debug/Debug";

const composer = new Composer;
const extractor = new Extractor;
const transcluder = new Transcluder;

const C = (a : string, b: Array<Entity>) => composer.compose(a, b);
const X = (a : Entity, b : Entity) => extractor.extract(a, b);
const T = (a : Entity, b : Entity, c : Entity) => transcluder.transclude(a, b, c);

const physicalObject = C('physical-object', []);
const hasLegs = C('has-legs', []);
const canApplyForce = C('can-apply-force', []);
const nameBob = C('name-Bob', []);

const kicker = C('kicker', [hasLegs, canApplyForce]);
const kickee = C('kickee', [physicalObject]);
const Bob = C('Bob', [hasLegs, canApplyForce, nameBob]);
const ball = C('ball', [physicalObject]);

const $kicker = C('[kicker]', [kicker, Proxy]);
const $kickee = C('[kickee]', [kickee, Proxy]);
const kick = C('kick', [$kicker, $kickee]);

console.log($kicker);
console.log($kickee);
console.log(kick);

const kick1 = T(kick, kicker, Bob);
const kick2 = T(kick1, kickee, ball);

console.debug(kick1.components);
console.debug(kick1.components[0].components);
console.debug(X(kick, kicker));
console.debug(X(kick1, kicker));
console.debug(kick2.components);
Debug.logStructure(kick2);
