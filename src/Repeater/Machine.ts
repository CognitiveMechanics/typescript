import {c0, c1, iH0, not0} from '../Numeric/Core';
import Entity from "../Entity/Entity";
import Kernel from "../Kernel/Kernel";
import {DefaultKernel} from "../Kernel/DefaultKernel";
import Proxy from "../Proxy/Proxy";

export const Mr = new Kernel;

const C = (a : string, b: Array<Entity>) => Mr.compose(a, b);
const T = (a : Entity, b : Entity, c : Entity) => Mr.transclude(a, b, c);
const X = (a : Entity, b : Entity) => {
    let r = Mr.extract(a, b);

    if (r === null) {
        return c0;
    }

    return r as Entity;
};

export const structure = C('structure', []);
export const times = C('times', []);
export const tag = C('tag', []);
export const value = C('value', []);

export function specr (name: string, s: Entity, n: Entity, t: Entity, v: Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [structure, s]),
            C('[times]', [times, n]),
            C('[tag]', [tag, t]),
            C('[value]',[value, v])
        ]
    );
}

Mr.state(
    specr('sr0', Proxy, not0, Proxy, Proxy)
).relation((s) => {
    return specr(
        'R(sr0)',
        T(
            DefaultKernel.run(X(s, structure)),
            X(s, tag),
            X(s, value)
        ),
        iH0(X(s, times)) as Entity,
        X(s, tag),
        X(s, value)
    );
});