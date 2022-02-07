
import {MU, specMU, specConfigurations} from '../src/Universal/Machine';
import {C, O, DefaultKernel, tag} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import {specEval, specRef, specopC2, specopC3, specopH0, specopiH0, specopTag, specopX,  op1, op2} from "../src/Universal/Operations";
import {c, c0, c1, not0} from "../src/Numeric/Core";
import Entity from "../src/Entity/Entity";
import DotProxy from "../src/Proxy/DotProxy";

DefaultKernel.extend(MU);

let Xa = C('a');
let Xb = C('b');
let Xc = C('c');

let sum = C('sum');
let product = C('product');

let r1 = DefaultKernel.run(
    specMU(
        'test-C',
        O([
            tag(Xa, Xb)
        ]),
        specConfigurations([
            {
                pattern: O([
                    tag(Xa, Proxy)
                ]),
                instruction: specopC2(specRef(Xa), Xc)
            }
        ])
    )
);

Debug.logStructure(r1);

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

let r2 = DefaultKernel.run(
    specMU(
        'test-H1c',
        specAdd('1 + 2', c(1), c(2), Proxy),
        specConfigurations([
            {
                pattern: specAdd('s0a', Proxy, Proxy, DotProxy),
                instruction: specopAdd(
                    Proxy,
                    specRef(op2),
                    specRef(op1)
                )
            },
            {
                pattern: specAdd('s1a', DotProxy, not0, Proxy),
                instruction: specopAdd(
                    Proxy,
                    specopiH0(specRef(op2)),
                    specopH0(specRef(sum))
                )
            },
            {
                pattern: specAdd('s2a', Proxy, DefaultKernel.dot(c0), Proxy),
                instruction: specopAdd(
                    Proxy,
                    Proxy,
                    specRef(sum)
                )
            },
        ])
    )
);

Debug.logStructure(r2);

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

let r3 = DefaultKernel.run(
    specMU(
        'test-H1c',
        specMult('6 * 4', c(6), c(4), Proxy),
        specConfigurations([
            {
                pattern: specAdd('s0a', Proxy, Proxy, DotProxy),
                instruction: specopAdd(
                    Proxy,
                    specRef(op2),
                    specRef(op1)
                )
            },
            {
                pattern: specAdd('s1a', DotProxy, not0, Proxy),
                instruction: specopAdd(
                    Proxy,
                    specopiH0(specRef(op2)),
                    specopH0(specRef(sum))
                )
            },
            {
                pattern: specAdd('s2a', Proxy, DefaultKernel.dot(c0), Proxy),
                instruction: specopAdd(
                    Proxy,
                    Proxy,
                    specRef(sum)
                )
            },
            {
                pattern: specMult('s0m', Proxy, Proxy, DotProxy),
                instruction: specopMult(
                    specRef(op1),
                    specRef(op2),
                    c0
                )
            },
            {
                pattern: specMult('s1m', Proxy, not0, Proxy),
                instruction: specopMult(
                    specRef(op1),
                    specopiH0(specRef(op2)),
                    specopX(
                        specEval(
                            specopAdd(
                                specRef(op1),
                                specRef(product),
                                Proxy
                            )
                        ),
                        sum
                    )
                )
            },
            {
                pattern: specMult('s2m', Proxy, DefaultKernel.dot(c0), Proxy),
                instruction: specopMult(
                    Proxy,
                    Proxy,
                    specRef(product)
                )
            },
        ])
    )
);

Debug.logStructure(r3);