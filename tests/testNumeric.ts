

import Composer from '../src/Composer/DefaultComposer';
import Matcher from '../src/Matcher/DefaultMatcher';
import Extractor from '../src/Extractor/DefaultExtractor';
import Transcluder from '../src/Transcluder/DefaultTranscluder';
import Entity from '../src/Entity/Entity';
import Debug from "../src/Debug/Debug";
import {c, k, eq, gteq, c0} from "../src/Numeric/Core";

const composer = new Composer;
const extractor = new Extractor;
const transcluder = new Transcluder;

const C = (a : string, b: Array<Entity>) => composer.compose(a, b);
const X = (a : Entity, b : Entity) => extractor.extract(a, b);
const T = (a : Entity, b : Entity, c : Entity) => transcluder.transclude(a, b, c);

const seq = C('<>', []);

const seq1 = T(seq, k(0), c(1));
const seq2 = T(seq1, k(1), c(2));

Debug.logStructure(seq1);
Debug.logStructure(seq2);

Debug.logStructure(X(seq2, k(0)));
Debug.logStructure(X(seq2, k(1)));

console.log('0', c(0));
console.log('4', c(4));
console.log('4 >= 4', gteq(c(4), c(4)));
console.log('4 >= 3', gteq(c(4), c(3)));
console.log('4 >= 5', gteq(c(4), c(5)));
console.log('4 = 4', eq(c(4), c(4)));
console.log('4 = 3', eq(c(4), c(3)));
console.log('4 = 5', eq(c(4), c(5)));
console.log('4 === 4', c(4) === c(4));
console.log('0 === 0', c(0) === c0);
