
import Entity from "../Entity/Entity";
import {E} from "../Kernel/DefaultKernel";
import NullEntity from "../Entity/NullEntity";

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
    const Yavg = YstarB(A,a) / (pairs(a).count() * A.length);

    return (pairs(a).count() / setpairs(A).count()) * (1 - Yavg);
}

export function Qpairs(pairs : PairSet, A : Array<Entity>) : number {
    const Yavg = YstarBpairs(A,pairs) / (pairs.count() * A.length);

    return (pairs.count() / setpairs(A).count()) * (1 - Yavg);
}

const powerset = (arr : Array<any>) =>
    arr.reduceRight(
        (accumulator, a) => [...accumulator, ...accumulator.map((b : any) => [a, ...b])],
        [[]]
    );

export function abstract (entities : Array<Entity>) : PairSet {
    let pairs = setpairs(entities);
    let subsets  = powerset(pairs.get());
    let maxQ = 0;
    let best = new PairSet();

    for (let subset of subsets) {
        const aPairs= new PairSet(subset);
        const score = Qpairs(aPairs, entities);

        if (score > maxQ) {
            maxQ = score;
            best = aPairs;
        }
    }

    return best;
}
