import {c0, H0} from '../Core';
import Entity from "../../Entity/Entity";
import Kernel from "../../Kernel/Kernel";
import Proxy from "../../Proxy/Proxy";
import {C, X, k} from "../../Kernel/DefaultKernel";

export const Mc0 = new Kernel;

export const [state, [begin, end]] = Mc0.label('state', ['begin', 'end']);
export const numeral = C('numeral', []);

export function specc0 (name: string, s: Entity, n: Entity) : Entity
{
    return C(
        name,
        [
            C('[state]', [k(state), s]),
            C('[num]', [k(numeral), n]),
        ]
    );
}

Mc0.state(
    specc0('sc00', begin, Proxy)
).relation((s : Entity) => {
    return specc0(
        'R(sc00)',
        end,
        H0(X(s, numeral, c0) as Entity) as Entity
    );
});