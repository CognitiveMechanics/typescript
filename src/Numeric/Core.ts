
import Composer from '../Composer/DefaultComposer';
import Matcher from '../Matcher/DefaultMatcher';
import Extractor from '../Extractor/DefaultExtractor';
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";

const composer = new Composer;
const matcher = new Matcher;
const extractor = new Extractor;

const C = (a : string, b : Array<Entity>) => composer.compose(a, b);
const X = (a : Entity, b : Entity) => extractor.extract(a, b);
const M = (a : Entity, b : Entity) => matcher.match(a, b);

export const numeral = C('numeral', []);
export const c0 = C('0', [numeral, Proxy]);
export const k0 = C('k0', [numeral, Proxy]);
export const c1 = c(1);
export const not0 = c1;

export function H0 (n : Entity) {
    let matches = n.name.match(/^([A-Za-z]+)?([0-9]+)$/);
    let name : string;

    if (matches) {
        name = (matches[1] || '') + (parseInt(matches[2]) + 1).toString();
    } else {
        name = 'unknown';
    }

    return C(name, [numeral, n]);
}

export function iH0 (n : Entity) {
    return X(C('n', [n]), numeral);
}

export function gteq (a : Entity, b : Entity) {
    return M(a, b) == 1;
}

export function eq (a : Entity, b : Entity) {
    return gteq(a, b) && ! gteq(a, H0(b));
}

declare global {
    var cCache : Record<number, Entity>;
    var kCache : Record<number, Entity>;
}

export function c (n : number) {
    if (! global.cCache) {
        global.cCache = {}
    }

    if (global.cCache[n]) {
        return global.cCache[n];
    }

    let number = c0;

    for (let i = 0; i < n; i++) {
        number = H0(number);
    }

    global.cCache[n] = number;

    return number;
}


export function k (n : number) {
    if (! global.kCache) {
        global.kCache = {}
    }

    if (global.kCache[n]) {
        return global.kCache[n];
    }

    let number = k0;

    for (let i = 0; i < n; i++) {
        number = H0(number);
    }

    global.kCache[n] = number;

    return number;
}