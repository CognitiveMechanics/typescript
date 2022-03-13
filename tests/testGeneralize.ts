import {specConfiguration, specConfigurations} from "../src/Universal/Machine";
import Proxy from "../src/Proxy/Proxy";
import DotProxy from "../src/Proxy/DotProxy";
import {op1, op2, specEval, specopC3, specopH0, specopiH0, specopTag, specopX, specRef} from "../src/Universal/Operations";
import {c, c0, not0} from "../src/Numeric/Core";
import {C, DefaultKernel, tag} from "../src/Kernel/DefaultKernel";
import Entity from "../src/Entity/Entity";
import {abstract, stringEntity} from "../src/Entropy/Entropy";

const sum = c(1);
const product = c(2);

function specAdd (name: string, a: Entity, b: Entity, r: Entity) : Entity
{
    return C(
        name,
        [
            tag(op1, a),
            tag(op2, b),
            tag(sum, r)
        ]
    );
}

function specopAdd (a : Entity, b : Entity, r : Entity) : Entity
{
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(sum, r)
    )
}

export function specMult (name: string, a: Entity, b: Entity, r: Entity) : Entity
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

function specopMult (a : Entity, b : Entity, r : Entity) : Entity
{
    return specopC3(
        specopTag(op1, a),
        specopTag(op2, b),
        specopTag(product, r)
    )
}

const addConfiguration = specAdd('s0a', Proxy, Proxy, DotProxy);
const multConfiguration = specMult('s0m', Proxy, Proxy, DotProxy);

console.log(
    stringEntity(addConfiguration),
    stringEntity(multConfiguration)
)

const abstractions = abstract([addConfiguration, multConfiguration], 2);

for (const a of abstractions) {
    console.log(stringEntity(a.entity));
}
