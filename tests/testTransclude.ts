
import Entity from '../src/Entity/Entity';
import Proxy from '../src/Proxy/Proxy';
import Debug from "../src/Debug/Debug";

import {C, X, T, k} from "../src/Kernel/DefaultKernel";

const physicalObject = C('physical-object', []);
const hasLegs = C('has-legs', []);
const canApplyForce = C('can-apply-force', []);
const nameBob = C('name-Bob', []);

const kicker = C('kicker', [hasLegs, canApplyForce]);
const kickee = C('kickee', [physicalObject]);
const Bob = C('Bob', [hasLegs, canApplyForce, nameBob]);
const ball = C('ball', [physicalObject]);

const $kicker = C('[kicker]', [k(kicker), Proxy]);
const $kickee = C('[kickee]', [k(kickee), Proxy]);
const kick = C('kick', [$kicker, $kickee]);

// console.log($kicker);
// console.log($kickee);
// console.log(kick);

const kick1 = T(kick, kicker, Bob);
const kick2 = T(kick1, kickee, ball);

Debug.logStructure(kick);
Debug.logStructure(kick1);
Debug.logStructure(kick2);

Debug.logStructure(X(kick, kicker));
Debug.logStructure(X(kick1, kicker));
Debug.logStructure(X(kick2, kicker));
Debug.logStructure(X(kick2, kickee));
