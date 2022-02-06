
import {MU, op1, op2, op3, specMU, specConfigurations} from '../src/Universal/Machine';
import {C, O, DefaultKernel, k, Y, tag} from "../src/Kernel/DefaultKernel";
import Proxy from "../src/Proxy/Proxy";
import Debug from "../src/Debug/Debug";
import {specEval, specRef, specopC2, specopC3, specopC4, specopH0, specopiH0, specopk, specopTag, specopX} from "../src/Universal/Operations";
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

export function specAdd (name: string, a: Entity, b: Entity, r: Entity) : Entity
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

let r2 = DefaultKernel.run(
    specMU(
        'test-H1c',
        specAdd('1 + 2', c(1), c(2), Proxy),
        specConfigurations([
            {
                pattern: specAdd('s0a', Proxy, Proxy, DotProxy),
                instruction: specopC3(
                    specopTag(op1, Proxy),
                    specopTag(op2, specRef(op2)),
                    specopTag(sum, specRef(op1))
                )
            },
            {
                pattern: specAdd('s1a', DotProxy, not0, Proxy),
                instruction: specopC3(
                    specopTag(op1, Proxy),
                    specopTag(op2, specopiH0(specRef(op2))),
                    specopTag(sum, specopH0(specRef(sum)))
                )
            },
            {
                pattern: specAdd('s2a', Proxy, DefaultKernel.dot(c0), Proxy),
                instruction: specopC3(
                    specopTag(op1, Proxy),
                    specopTag(op2, Proxy),
                    specopTag(sum, specRef(sum))
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

let r3 = DefaultKernel.run(
    specMU(
        'test-H1c',
        specMult('6 * 4', c(6), c(4), Proxy),
        specConfigurations([
            {
                pattern: specAdd('s0a', Proxy, Proxy, DotProxy),
                instruction: specopC3(
                    specopTag(op1, Proxy),
                    specopTag(op2, specRef(op2)),
                    specopTag(sum, specRef(op1))
                )
            },
            {
                pattern: specAdd('s1a', DotProxy, not0, Proxy),
                instruction: specopC3(
                    specopTag(op1, Proxy),
                    specopTag(op2, specopiH0(specRef(op2))),
                    specopTag(sum, specopH0(specRef(sum)))
                )
            },
            {
                pattern: specAdd('s2a', Proxy, DefaultKernel.dot(c0), Proxy),
                instruction: specopC3(
                    specopTag(op1, Proxy),
                    specopTag(op2, Proxy),
                    specopTag(sum, specRef(sum))
                )
            },
            {
                pattern: specMult('s0m', Proxy, Proxy, DotProxy),
                instruction: specopC3(
                    specopTag(op1, specRef(op1)),
                    specopTag(op2, specRef(op2)),
                    specopTag(product, c0)
                )
            },
            {
                pattern: specMult('s1m', Proxy, not0, Proxy),
                instruction: specopC3(
                    specopTag(op1, specRef(op1)),
                    specopTag(op2, specopiH0(specRef(op2))),
                    specopTag(
                        product,
                        specopX(
                            specEval(
                                specopC3(
                                    specopTag(op1, specRef(op1)),
                                    specopTag(op2, specRef(product)),
                                    specopTag(sum, Proxy)
                                )
                            ),
                            sum
                        )
                    )
                )
            },
            {
                pattern: specMult('s2m', Proxy, DefaultKernel.dot(c0), Proxy),
                instruction: specopC3(
                    Proxy,
                    Proxy,
                    specRef(product)
                )
            },
        ])
    )
);

Debug.logStructure(r3);