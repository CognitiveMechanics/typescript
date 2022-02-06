import Kernel from "../../Kernel/Kernel";
import {begin, end, Mc0, numeral, state} from "./Machine";
import {Mr} from "../../Repeater/Machine";
import Entity from "../../Entity/Entity";
import {C, DefaultKernel, k, tag, X} from "../../Kernel/DefaultKernel";
import Proxy from "../../Proxy/Proxy";
import {c0, c1, H0, iH0, not0} from "../Core";
import dotProxy from "../../Proxy/DotProxy";
import DotProxy from "../../Proxy/DotProxy";
import Debug from "../../Debug/Debug";

export const [operands, [op1, op2, sum, product, power, diff]] = Mc0.label('operands', ['op1', 'op2', 'sum', 'product', 'power', 'diff']);

// ADDITION

export const Mc1 = new Kernel;

export function specc1 (name: string, a: Entity, b: Entity, r: Entity) : Entity
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(sum, r),
        ]
    );
}

Mc1.state(
    specc1('sc10', Proxy, Proxy, DotProxy)
).relation((s : Entity) => {
    return specc1(
        'R(sc10)',
        Proxy,
        X(s, op2),
        X(s, op1)
    );
});

Mc1.state(
    specc1('sc11', DotProxy, not0, Proxy)
).relation((s : Entity) => {
    return specc1(
        'R(sc11)',
        Proxy,
        iH0(X(s, op2)),
        H0(X(s, sum))
    );
});

Mc1.state(
    specc1('sc12', DotProxy, Mc1.dot(c0), Proxy)
).relation((s : Entity) => {
    return specc1(
        'R(sc12)',
        Proxy,
        Proxy,
        X(s, sum)
    );
});

export function H1c (a : Entity, b : Entity) {
    return X(
        Mc1.run(
            specc1('H1c()', a, b, Proxy)
        ),
        sum
    );
}

// MULTIPLICATION

export const Mc2 = new Kernel;

export function specc2 (name: string, a: Entity, b: Entity, r: Entity) : Entity
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(product, r),
        ]
    );
}

Mc2.state(
    specc2('sc20', Proxy, Proxy, dotProxy)
).relation((s : Entity) => {
    return specc2(
        'R(sc20)',
        X(s, op1),
        X(s, op2),
        c0
    );
});

Mc2.state(
    specc2('sc21', Proxy, not0, Proxy)
).relation((s : Entity) => {
    return specc2(
        'R(sc21)',
        X(s, op1),
        iH0(X(s, op2)),
        X(
            Mc1.run(
                specc1('Mc1()', X(s, product), X(s, op1), Proxy)
            ),
            sum
        )
    );
});

Mc2.state(
    specc2('sc22', Proxy, Mc1.dot(c0), Proxy)
).relation((s : Entity) => {
    return specc2(
        'R(sc22)',
        Proxy,
        Proxy,
        X(s, product)
    );
});

export function H2c (a : Entity, b : Entity) {
    return X(
        Mc2.run(
            specc2('H2c()', a, b, Proxy)
        ),
        product
    );
}

// EXPONENTIATION

export const Mc3 = new Kernel;

Mc3.extend(Mr);
Mc3.extend(Mc0);

export function specc3 (name: string, a: Entity, b: Entity, r: Entity) : Entity
{
    return C(
        name,
        [
            C('[op1]', [k(op1), a]),
            C('[op2]', [k(op2), b]),
            C('[H3c]', [k(power), r]),
        ]
    );
}

Mc3.state(
    specc3('sc30', Proxy, Proxy, dotProxy)
).relation((s : Entity) => {
    return specc3(
        'R(sc30)',
        X(s, op1),
        X(s, op2),
        c1
    );
});

Mc3.state(
    specc3('sc31', Proxy, not0, Proxy)
).relation((s : Entity) => {
    const r = Mc2.run(
        specc2('Mc2()', X(s, power), X(s, op1), Proxy)
    );

    return specc3(
        'R(sc31)',
        X(s, op1),
        iH0(X(s, op2)),
        X(r, product)
    );
});

Mc3.state(
    specc3('sc32', Proxy, Mc1.dot(c0), Proxy)
).relation((s : Entity) => {
    return specc3(
        'R(sc32)',
        Proxy,
        Proxy,
        X(s, power)
    );
});

export function H3c (a : Entity, b : Entity) {
    const r = Mc3.run(
        specc3('H3c()', a, b, Proxy)
    );

    return X(r, power);
}

// SUBTRACTION


export const Mic1 = new Kernel;

export function specic1 (name: string, a: Entity, b: Entity, r: Entity) : Entity
{
    return C(
        name,
        [
            C('[op1]', [k(op1), a]),
            C('[op2]', [k(op2), b]),
            C('[diff]', [k(diff), r]),
        ]
    );
}

Mic1.state(
    specic1('isc10', Proxy, Proxy, DotProxy)
).relation((s : Entity) => {
    return specic1(
        'R(sic10)',
        Proxy,
        X(s, op2),
        X(s, op1)
    );
});

Mic1.state(
    specic1('isc11', Proxy, not0, not0)
).relation((s : Entity) => {
    return specic1(
        'R(sic11)',
        Proxy,
        iH0(X(s, op2)),
        iH0(X(s, diff))
    );
});

Mic1.state(
    specic1('isc12', Proxy, Mc1.dot(c0), Proxy)
).relation((s : Entity) => {
    return specic1(
        'R(sic12)',
        Proxy,
        Proxy,
        X(s, diff)
    );
});

export function iH1c (a : Entity, b : Entity) {
    const r = Mic1.run(
        specic1('iH1c()', a, b, Proxy)
    );

    if (X(r, op2) != Proxy) {
        return null;
    } else {
        return X(r, diff);
    }
}