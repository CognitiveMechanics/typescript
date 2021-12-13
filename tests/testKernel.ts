
import {DefaultKernel as Kernel, C, M} from '../src/Kernel/DefaultKernel';
import Entity from "../src/Entity/Entity";
import Debug from "../src/Debug/Debug";

const state = C('state', [
    new Entity('{state}')
]);

const begin = state.extend('begin', [
    new Entity('{state:begin}')
]);

const end = state.extend('end', [
    new Entity('{state:end}')
]);

function spec (name: string, s : Entity)
{
    return C(
        name,
        [
            C('[state]', [state, s])
        ]
    );
}

const s1 = spec('s1', begin)
    .relation(() => {
        return spec('R(s1)', end)
    });

Kernel.state(s1);

const s2 = Kernel.run(s1);

Debug.logStructure(s1);
Debug.logStructure(s2);