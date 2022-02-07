import Kernel from "../Kernel/Kernel";
import {C, k, X, Y, T, tag} from "../Kernel/DefaultKernel";
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import DotProxy from "../Proxy/DotProxy";
import {anynum, c, c0, H0, iH0} from "../Numeric/Core";
import NullEntity from "../Entity/NullEntity";
import TrueEntity from "../Entity/TrueEntity";

export const MU = new Kernel;

export const structure = C('structure', []);
export const configurations = C('configurations', []);
export const index = C('index', []);
export const next = C('next', []);
export const matched = C('matched', []);
export const pattern = C('pattern', []);
export const instruction = C('instruction', []);
export const result = C('result', []);

export function specU (name: string, s : Entity, c : Entity, i : Entity,
                n : Entity, m : Entity, j : Entity, r : Entity)
    : Entity
{
    return C(
        name,
        [
            tag(structure, s),
            tag(configurations, c),
            tag(index, i),
            tag(next, n),
            tag(matched, m),
            tag(instruction, j),
            tag(result, r),
        ]
    );
}

export function specMU (name: string, s : Entity, c : Entity) {
    return specU(name, s, c, Proxy, Proxy, Proxy, Proxy, Proxy);
}

export function specUi (name: string, s : Entity, c : Entity, j : Entity) : Entity
{
    return C(
        name,
        [
            C('[structure]', [k(structure), s]),
            C('[configurations]', [k(configurations), c]),
            C('[instruction]', [k(instruction), j]),
        ]
    );
}

export function specConfigurations (cs : Array<Record<string, any>>)
{
    let configs = C('[configurations]', []);

    for (let i = 0; i < cs.length; i += 1) {
        configs = T(configs, c(i), C(
            '[configuration]',
            [
                C('[pattern]', [k(pattern), cs[i].pattern]),
                C('[instruction]', [k(instruction), cs[i].instruction]),
            ]
        ));
    }

    return configs;
}

export function evalUi (s : Entity, c : Entity, i : Entity) {
    return X(MU.run(specUi('eval', s, c, i)), instruction);
}

// init — set index to zero and next to first configuration

MU.state(
    specU('sU0', Proxy, Proxy, DotProxy, DotProxy, Proxy, DotProxy, DotProxy)
).relation((s) => {
    return specU(
        'R(sU0)',
        X(s, structure),
        X(s, configurations),
        c0,
        X(X(s, configurations), c0, Proxy) as Entity,
        NullEntity,
        Proxy,
        Proxy
    )
});

// execute instruction

MU.state(
    specU('sU1', Proxy, Proxy, anynum, Proxy, TrueEntity, Proxy, DotProxy)
).relation((s) => {
    return specU(
        'R(sU1)',
        evalUi(
            X(s, structure),
            X(s, configurations),
            X(s, instruction)
        ),
        X(s, configurations),
        c0,
        X(X(s, configurations), c0, Proxy) as Entity,
        NullEntity,
        Proxy,
        Proxy
    )
});

// stop if there is no next instruction

MU.state(
    specU('sU2', Proxy, Proxy, anynum, DotProxy, Proxy, Proxy, Proxy)
).relation((s) => {
    return specU(
        'R(sU2)',
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        Proxy,
        X(s, structure)
    )
});

// set pattern

MU.state(
    specU('sU3', Proxy, Proxy, anynum, Proxy, NullEntity, Proxy, DotProxy)
).relation((s) => {
    return specU(
        'R(sU3)',
        X(s, structure),
        X(s, configurations),
        H0(X(s, index)),
        X(X(s, configurations), H0(X(s, index)), Proxy) as Entity,
        Y(X(s, structure), X(X(X(s, configurations), X(s, index)), pattern)),
        X(X(X(s, configurations), X(s, index)), instruction),
        Proxy
    )
});
