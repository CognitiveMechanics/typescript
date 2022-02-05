
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import {k, C, X, Y} from "../Kernel/DefaultKernel";
import NullEntity from "../Entity/NullEntity";

declare global {
    var cCache : Record<number, Entity>;
}

export const num = C('num', []);
export const c0 = C('0', [k(num), Proxy]);
export const c1 = c(1);
export const not0 = c1;
export const anynum = c0;

export function H0 (n : Entity) {
    if (! global.cCache) {
        global.cCache = {}
    }

    let matches = n.name.match(/^([A-Za-z]+)?([0-9]+)$/);

    if (! matches) {
        throw new Error('Invalid numeric entity');
    }

    let number = parseInt(matches[2]) + 1;
    let prefix = matches[1];

    let name = (prefix || '') + number.toString();

    if (global.cCache[number]) {
        return global.cCache[number];
    } else {
        return global.cCache[number] = C(name, [k(num), n]);
    }
}

export function iH0 (n : Entity) {
    return X(C('n', [n]), num);
}

export function gteq (a : Entity, b : Entity) {
    return Y(a, b) !== NullEntity;
}

export function eq (a : Entity, b : Entity) {
    return gteq(a, b) && ! gteq(a, H0(b));
}

export function c (n : number) {
    if (! global.cCache) {
        global.cCache = {}
    }

    if (global.cCache[n]) {
        return global.cCache[n];
    }

    let number = c0;

    for (let i = 1; i <= n; i++) {
        if (global.cCache[i]) {
            number = global.cCache[i];
        } else {
            number = global.cCache[i] = H0(number);
        }
    }

    return number;
}