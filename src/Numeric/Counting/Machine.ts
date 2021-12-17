import {c0} from '../../Numeric/Core';
import Entity from "../../Entity/Entity";
import Kernel from "../../Kernel/Kernel";
import Proxy from "../../Proxy/Proxy";
import {H0} from "../Core";

export const Mc0 = new Kernel;

const C = (a : string, b: Array<Entity>) => Mc0.compose(a, b);
const X = (a : Entity, b : Entity) => {
    let r = Mc0.extract(a, b);

    if (r === null) {
        return c0;
    }

    return r as Entity;
};

export const [state, [begin, end]] = Mc0.label('state', ['begin', 'end']);
export const numeral = C('numeral', []);

export function specc0 (name: string, s: Entity, n: Entity) : Entity
{
    return C(
        name,
        [
            C('[state]', [state, s]),
            C('[times]', [numeral, n]),
        ]
    );
}

Mc0.state(
    specc0('sc00', begin, Proxy)
).relation((s : Entity) => {
    return specc0(
        'R(sc00)',
        end,
        H0(X(s, numeral)) as Entity
    );
});