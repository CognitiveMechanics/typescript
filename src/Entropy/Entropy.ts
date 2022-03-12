
import Entity from "../Entity/Entity";
import {E} from "../Kernel/DefaultKernel";
import NullEntity from "../Entity/NullEntity";
import Debug from "../Debug/Debug";

export type Pair = {
    parent : string,
    child : string
};

export class PairSet {
    pairs : Array<Pair>;

    constructor(pairs : Array<Pair> = []) {
        this.pairs = pairs;
    }

    add (pair : Pair) {
        if (! this.contains(pair)) {
            this.pairs.push(pair);
            return true;
        }

        return false;
    }

    contains (pair : Pair) {
        for (let p of this.pairs) {
            if (p.parent === pair.parent && p.child === pair.child) {
                return true;
            }
        }

        return false;
    }

    merge (set: PairSet) {
        for (let pair of set.get()) {
            this.add(pair);
        }
    }

    get () {
        return this.pairs;
    }

    count () {
        return this.pairs.length;
    }
}

export function pairs (entity : Entity, root = true) : PairSet {
    const set = new PairSet();

    for (let e of E(entity)) {
        if (root) {
            set.add({
                parent: '[root]',
                child: e.name
            });
        } else {
            set.add({
                parent: entity.name,
                child: e.name
            });
        }

        if (e.components.length) {
            set.merge(
                pairs(e, false)
            );
        }
    }

    return set;
}

export function setpairs (entities : Array<Entity>) : PairSet {
    let set = new PairSet();

    for (let e of entities) {
        set.merge(pairs(e));
    }

    return set;
}

const avg = (array : Array<number>) => array.reduce((a, b) => a + b) / array.length;

export function Ystar (entities : Array<Entity>) {
    const pairSet = setpairs(entities);
    const values : Array<number> = [];
    let entropy = 0;

    for (let pair of pairSet.get()) {
        let pairValues : Array<number> = [];

        for (let entity of entities) {
            const entityPairs = pairs(entity);

            if (entityPairs.contains(pair)) {
                pairValues.push(1);
            } else {
                pairValues.push(0);
            }
        }

        values.push(
            avg(pairValues)
        );
    }

    for (let p of values) {
        const c  = 1 - p;

        if (c === 0) {
            entropy += (p * Math.log2(p));
        } else if (p === 0) {
            entropy += (c * Math.log2(c));
        } else {
            entropy += (p * Math.log2(p)) + (c * Math.log2(c));
        }
    }

    return entropy == 0 ? 0 : -entropy;
}

export function YstarB (entities : Array<Entity>, base : Entity) {
    const pairSet = pairs(base);

    return YstarBpairs(entities, pairSet);
}

export function YstarBpairs (entities : Array<Entity>, pairSet : PairSet) {
    let entropy = 0;

    for (let entity of entities) {
        let entityPairs = pairs(entity);

        for (let pair of pairSet.get()) {
            let value = entityPairs.contains(pair) ? 1 : 0;
            entropy += Math.log2((1 + value) / 2);
        }
    }

    return entropy == 0 ? 0 : -entropy;
}

export function Q(a : Entity, A : Array<Entity>) : number {
    const pairSet = pairs(a);

    return Qpairs(pairSet, A);
}

export function Qpairs(pairs : PairSet, A : Array<Entity>) : number {
    const Yavg = YstarBpairs(A,pairs) / (pairs.count() * A.length);

    return (pairs.count() / setpairs(A).count()) * (1 - Yavg);
}

function powerset (arr : Array<any>) : Array<any> {
    return arr.reduceRight(
        (accumulator, a) => [...accumulator, ...accumulator.map((b : any) => [a, ...b])],
        [[]]
    );
}

export function abstract (entities : Array<Entity>) : Array<PairSet> {
    let pairs = setpairs(entities);
    let subsets  = powerset(pairs.get());
    let maxQ = 0;
    let best : Array<PairSet> = [];

    for (let subset of subsets) {
        const aPairs = new PairSet(subset);
        const score = Qpairs(aPairs, entities);

        if (score > maxQ) {
            maxQ = score;
            best = [aPairs];
        } else if (score === maxQ) {
            best.push(aPairs);
        }
    }

    return best;
}

export function flattenEntity (a : Entity) : Entity|Array<any> {
    if (a.isPrime()) {
        return a;
    } else {
        return a.components.map((b) => flattenEntity(b)) as Array<any>;
    }
}

export function stringEntity (a : Entity) : string {
    function inner (a : Entity) : any {
        if (a.isPrime()) {
            return a.name;
        } else {
            return a.components.map((b) => inner(b)).sort();
        }
    }

    return JSON.stringify(inner(a));
}

export function permute (entity : Entity) : Array<Entity> {
    function inner (a : Entity) : Array<any> {
        if (a.isPrime()) {
            return [a, []];
        } else {
            let children = E(a);
            let innered = children.map((c) => inner(c));
            let permed = p(innered);

            return permed;
        }
    }

    let result = filterEmptyArrays(inner(entity));
    let final : Array<any>= result;

    for (let r of result) {
        while (Array.isArray(r) && r.length == 1) {
            r = r[0];

            final.push(r);
        }
    }

    return uniqueEntities(final);
}


function uniqueEntities (A : Array<any>) : Array<Entity> {
    let result : Array<Entity> = [];
    let keys : Array<string> = [];

    for (let a of A) {
        if (Array.isArray(a) && ! a.length) {
            continue;
        }

        let e;

        if (a instanceof Entity) {
            e = a;
        } else {
            e = arrayToEntity(a);
        }

        let k = stringEntity(e);

        if (keys.indexOf(k) == -1) {
            result.push(e);
            keys.push(k);
        }
    }

    return result;
}

function p(a : Array<any>) : Array<any> {
    let i, j, l, m, a1, o = [];

    if (!a || a.length == 0) {
        return a;
    }

    a1 = a.splice(0, 1)[0];
    a = p(a);

    for (i = 0, l = a1.length; i < l; i++) {
        if (a && a.length) {
            for (j = 0, m = a.length; j < m; j++) {
                o.push([a1[i]].concat(a[j]));
            }
        } else {
            o.push([a1[i]]);
        }
    }

    return o;
}

function filterEmptyArrays (A : Array<any>) : Array<any> {
    let r = [];

    for (let a of A) {
        if (Array.isArray(a) && a.length == 0) {
            continue;
        } else if (Array.isArray(a)) {
            const v = filterEmptyArrays(a);

            if (v.length) {
                r.push(v);
            }
        } else {
            r.push(a);
        }
    }

    return r;
}

function arrayToEntity (a : Array<any>) : Entity {
    let c : Array<Entity> = [];

    for (let b of a) {
        if (Array.isArray(b)) {
            c.push(arrayToEntity(b));
        } else {
            c.push(b);
        }
    }

    return new Entity('+', c);
}

// Debug.logDeep(p([
//     [0,1],
//     [2,3],
//     [4,5],
//     [6,7],
//     [8,9],
// ]))
