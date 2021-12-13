import {c, c0, c1, k0, H0, iH0, not0} from '../Core';
import Entity from "../../Entity/Entity";
import Kernel from "../../Kernel/Kernel";
import Proxy from "../../Proxy/Proxy";
import Debug from "../../Debug/Debug";

export const Mb = new Kernel;

const C = (a : string, b: Array<Entity>) => Mb.compose(a, b);
const T = (a : Entity, b : Entity, c : Entity) => Mb.transclude(a, b, c);
const X = (a : Entity, b : Entity) => {
    let r = Mb.extract(a, b);

    if (r === null) {
        return c0;
    }

    return r as Entity;
}

export const [state, [begin, iter, carry, end]] = Mb.label('state', ['begin', 'iter', 'carry', 'end']);

export const value = C('value', []);
export const current = C('current', []);
export const index = C('index', []);
export const digits = C('digits', []);

export function specb (name: string, s : Entity, v : Entity, c : Entity, i : Entity, d : Entity) : Entity
{
    return C(
        name,
        [
            C('[state]', [state, s]),
            C('[value]', [value, v]),
            C('[current]', [current, c]),
            C('[index]',[index, i]),
            C('[digits]', [digits, d]),
        ]
    );
}

Mb.state(
    specb('sb0', begin, Proxy, Proxy, Proxy, Proxy)
).relation((s) => {
    return specb(
        'R(sb0)',
        iter,
        X(s, value),
        c0,
        k0,
        C('seq', [])
    );
});

Mb.state(
    specb('sb1', iter, not0, Mb.dot(c0), Proxy, Proxy)
).relation((s) => {
    return specb(
        'R(sb1)',
        iter,
        iH0(X(s, value)) as Entity,
        c1,
        X(s, index),
        T(
            X(s, digits),
            X(s, index),
            c1
        )
    );
});

Mb.state(
    specb('sb2', iter, not0, Mb.dot(c1), Proxy, Proxy)
).relation((s) => {
    const newIndex = H0(X(s, index));

    return specb(
        'R(sb2)',
        carry,
        X(s, value),
        X(X(s, digits), newIndex),
        newIndex,
        T(
            X(s, digits),
            X(s, index),
            c0
        )
    );
});

Mb.state(
    specb('sb3', carry, not0, Mb.dot(c1), Proxy, Proxy)
).relation((s) => {
    const newIndex = H0(X(s, index));

    return specb(
        'R(sb3)',
        carry,
        X(s, value),
        X(X(s, digits), newIndex),
        newIndex,
        T(
            X(s, digits),
            X(s, index),
            c0
        )
    );
});

Mb.state(
    specb('sb4', carry, not0, Mb.dot(c0), Proxy, Proxy)
).relation((s) => {
    return specb(
        'R(sb4)',
        iter,
        iH0(X(s, value)) as Entity,
        X(X(s, digits), k0),
        k0,
        T(
            X(s, digits),
            X(s, index),
            c1
        )
    );
});

Mb.state(
    specb('sb5', iter, Mb.dot(c0), Proxy, Proxy, Proxy)
).relation((s) => {
    return specb(
        'R(sb5)',
        end,
        Proxy,
        Proxy,
        Proxy,
        X(s, digits)
    );
});