import {c0, c1, iH0, not0} from '../Numeric/Core';
import Entity from "../Entity/Entity";
import Kernel from "../Kernel/Kernel";
import {DefaultKernel, C, T, X$, k} from "../Kernel/DefaultKernel";
import Proxy from "../Proxy/Proxy";

export const Mr = new Kernel;

export const structure = C('structure', []);
export const times = C('times', []);
export const tag = C('tag', []);
export const value = C('value', []);
export const tag1 = C('tag1', []);
export const value1 = C('value1', []);
export const tag2 = C('tag2', []);
export const value2 = C('value2', []);

// NO SUBS

export function specr0 (name: string, s: Entity, n: Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [k(structure), s]),
            C('[times]', [k(times), n])
        ]
    );
}

Mr.state(
    specr0('sr0', Proxy, not0)
).relation((s) => {
    return specr0(
        'R(sr0)',
        T(
            DefaultKernel.run(X$(s, structure)),
            X$(s, tag),
            X$(s, value)
        ),
        iH0(X$(s, times))
    );
});

// 1 SUB

export function specr1 (name: string, s: Entity, n: Entity, t: Entity, v: Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [k(structure), s]),
            C('[times]', [k(times), n]),
            C('[tag]', [k(tag), t]),
            C('[value]',[k(value), v])
        ]
    );
}

Mr.state(
    specr1('sr0', Proxy, not0, Proxy, Proxy)
).relation((s) => {
    return specr1(
        'R(sr0)',
        T(
            DefaultKernel.run(X$(s, structure)),
            X$(s, tag),
            X$(s, value)
        ),
        iH0(X$(s, times)),
        X$(s, tag),
        X$(s, value)
    );
});

// 2 SUBS

export function specr2 (name: string, s: Entity, n: Entity, t1: Entity, v1: Entity, t2: Entity, v2: Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [k(structure), s]),
            C('[times]', [k(times), n]),
            C('[tag1]', [k(tag1), t1]),
            C('[value1]',[k(value1), v1]),
            C('[tag2]', [k(tag2), t2]),
            C('[value2]',[k(value2), v2]),
        ]
    );
}

Mr.state(
    specr2('sr0', Proxy, not0, Proxy, Proxy, Proxy, Proxy)
).relation((s) => {
    return specr2(
        'R(sr0)',
        T(
            T(
                DefaultKernel.run(X$(s, structure)),
                X$(s, tag1),
                X$(s, value1)
            ),
            X$(s, tag2),
            X$(s, value2)
        ),
        iH0(X$(s, times)),
        X$(s, tag1),
        X$(s, value1),
        X$(s, tag2),
        X$(s, value2)
    );
});