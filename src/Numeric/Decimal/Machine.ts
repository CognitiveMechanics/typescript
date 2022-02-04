import {c, c0, c1, H0, iH0, not0} from '../Core';
import Entity from "../../Entity/Entity";
import Kernel from "../../Kernel/Kernel";
import Proxy from "../../Proxy/Proxy";
import Debug from "../../Debug/Debug";
import {C, T, X, k, dot} from "../../Kernel/DefaultKernel";
export const Md = new Kernel;

const k0 = k(c0);

export const [state, [begin, iter, carry, end]] = Md.label('state', ['begin', 'iter', 'carry', 'end']);

export const value = C('value', []);
export const current = C('current', []);
export const index = C('index', []);
export const digits = C('digits', []);
export const decimal = C('decimal', []);

export function specd (name: string, s : Entity, v : Entity, c : Entity, i : Entity, d : Entity) : Entity
{
    return C(
        name,
        [
            C('[state]', [k(state), s]),
            C('[value]', [k(value), v]),
            C('[current]', [k(current), c]),
            C('[index]',[k(index), i]),
            C('[digits]', [k(digits), d]),
            decimal,
        ]
    );
}

Md.state(
    specd('sd0', begin, Proxy, Proxy, Proxy, Proxy)
).relation((s) => {
    return specd(
        'R(sd0)',
        iter,
        X(s, value),
        c0,
        c0,
        C('seq', [])
    );
});

Md.state(
    specd('sd1', iter, not0, c(9), Proxy, Proxy)
).relation((s) => {
    const newIndex = H0(X(s, index));

    return specd(
        'R(sd1)',
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

Md.state(
    specd('sd2', iter, not0, Proxy, Proxy, Proxy)
).relation((s) => {
    return specd(
        'R(sd2)',
        iter,
        iH0(X(s, value)),
        H0(X(s, current)),
        X(s, index),
        T(
            X(s, digits),
            X(s, index),
            H0(X(s, current))
        )
    );
});

Md.state(
    specd('sd3', carry, not0, dot(c(9)), Proxy, Proxy)
).relation((s) => {
    const newIndex = H0(X(s, index));

    return specd(
        'R(sd3)',
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

Md.state(
    specd('sd4', carry, not0, Proxy, Proxy, Proxy)
).relation((s) => {
    return specd(
        'R(sd4)',
        iter,
        iH0(X(s, value)),
        X(X(s, digits), c0),
        c0,
        T(
            X(s, digits),
            X(s, index),
            H0(X(s, current)),
        )
    );
});

Md.state(
    specd('sd5', iter, dot(c0), Proxy, Proxy, Proxy)
).relation((s) => {
    console.log('s5');
    return specd(
        'R(sd5)',
        end,
        Proxy,
        Proxy,
        Proxy,
        X(s, digits)
    );
});