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

export function specr (name: string, s: Entity, n: Entity, t: Entity, v: Entity) : Entity
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
    specr('sr0', Proxy, not0, Proxy, Proxy)
).relation((s) => {
    return specr(
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