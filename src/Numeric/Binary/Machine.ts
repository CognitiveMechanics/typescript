import {c, c0, c1, H0, iH0, not0} from '../Core';
import Entity from "../../Entity/Entity";
import Kernel from "../../Kernel/Kernel";
import Proxy from "../../Proxy/Proxy";
import Debug from "../../Debug/Debug";
import {C, T, X, k, dot} from "../../Kernel/DefaultKernel";
export const Mb = new Kernel;

const k0 = k(c0);

export const [state, [begin, iter, carry, end]] = Mb.label('state', ['begin', 'iter', 'carry', 'end']);

export const value = C('value', []);
export const current = C('current', []);
export const index = C('index', []);
export const digits = C('digits', []);
export const binary = C('binary', []);

export function specb (name: string, s : Entity, v : Entity, c : Entity, i : Entity, d : Entity) : Entity
{
    return C(
        name,
        [
            C('[state]', [k(state), s]),
            C('[value]', [k(value), v]),
            C('[current]', [k(current), c]),
            C('[index]',[k(index), i]),
            C('[digits]', [k(digits), d]),
            binary,
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
        c0,
        C('seq', [])
    );
});

Mb.state(
    specb('sb1', iter, not0, dot(c0), Proxy, Proxy)
).relation((s) => {
    return specb(
        'R(sb1)',
        iter,
        iH0(X(s, value)),
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
    specb('sb2', iter, not0, dot(c1), Proxy, Proxy)
).relation((s) => {
    const newIndex = H0(X(s, index));

    return specb(
        'R(sb2)',
        carry,
        X(s, value),
        X(X(s, digits), newIndex, c0) as Entity,
        newIndex,
        T(
            X(s, digits),
            X(s, index),
            c0
        )
    );
});

Mb.state(
    specb('sb3', carry, not0, dot(c1), Proxy, Proxy)
).relation((s) => {
    const newIndex = H0(X(s, index));

    return specb(
        'R(sb3)',
        carry,
        X(s, value),
        X(X(s, digits), newIndex, c0) as Entity,
        newIndex,
        T(
            X(s, digits),
            X(s, index),
            c0
        )
    );
});

Mb.state(
    specb('sb4', carry, not0, dot(c0), Proxy, Proxy)
).relation((s) => {
    return specb(
        'R(sb4)',
        iter,
        iH0(X(s, value)),
        X(X(s, digits), c0),
        c0,
        T(
            X(s, digits),
            X(s, index),
            c1
        )
    );
});

Mb.state(
    specb('sb5', iter, dot(c0), Proxy, Proxy, Proxy)
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