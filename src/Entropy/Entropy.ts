
import Entity from "../Entity/Entity";
import {E} from "../Kernel/DefaultKernel";
import NullEntity from "../Entity/NullEntity";
import Debug from "../Debug/Debug";

export type Permutation = Entity;

export class PermutationSet {
    permutations : Array<Permutation> = [];

    constructor(permutations : Array<Permutation> = []) {
        for (let p of permutations) {
            this.add(p);
        }
    }

    add (permutation : Permutation) {
        if (! this.contains(permutation)) {
            this.permutations.push(permutation);
        }
    }

    contains (permutation : Permutation) {
        let key = stringEntity(permutation);

        for (let p of this.permutations) {
            if (key === stringEntity(p)) {
                return true;
            }
        }

        return false;
    }

    merge (set: PermutationSet) {
        let perms = set.get();

        for (let k in perms) {
            this.add(perms[k]);
        }
    }

    get () {
        return this.permutations;
    }

    count () {
        return this.permutations.length;
    }
}


export function permutations (entity : Entity) : PermutationSet {
    return new PermutationSet(permute(entity) as Array<Permutation>);
}

export function setpermutations (entities : Array<Entity>) : PermutationSet {
    let set = new PermutationSet();

    for (let e of entities) {
        set.merge(permutations(e));
    }

    return set;
}

const avg = (array : Array<number>) => array.reduce((a, b) => a + b) / array.length;

export function Ystar (entities : Array<Entity>) {
    const permutationSet = setpermutations(entities);
    const values : Array<number> = [];
    let entropy = 0;

    for (let permutation of permutationSet.get()) {
        let permutationValues : Array<number> = [];

        for (let entity of entities) {
            const entityPermutations = permutations(entity);

            if (entityPermutations.contains(permutation)) {
                permutationValues.push(1);
            } else {
                permutationValues.push(0);
            }
        }

        values.push(
            avg(permutationValues)
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
    const permutationSet = permutations(base);

    return YstarBpermutations(entities, permutationSet);
}

export function YstarBpermutations (entities : Array<Entity>, permutationSet : PermutationSet) {
    let entropy = 0;

    for (let entity of entities) {
        let entityPermutations = permutations(entity);

        for (let permutation of permutationSet.get()) {
            let value = entityPermutations.contains(permutation) ? 1 : 0;
            entropy += Math.log2((1 + value) / 2);
        }
    }

    return entropy == 0 ? 0 : -entropy;
}

export function Q(a : Entity, A : Array<Entity>) : number {
    const permutationSet = permutations(a);

    return Qpermutations(permutationSet, A);
}

export function Qpermutations(permutationSet : PermutationSet, A : Array<Entity>) : number {
    const Yavg = YstarBpermutations(A,permutationSet) / A.length;

    return (permutationSet.count() / setpermutations(A).count()) * (1 - Yavg);
}

function powerset (arr : Array<any>) : Array<any> {
    return arr.reduceRight(
        (accumulator, a) => [...accumulator, ...accumulator.map((b : any) => [a, ...b])],
        [[]]
    );
}

export function abstract (entities : Array<Entity>) : Array<Entity> {
    let maxQ = 0;
    let best : Array<Entity> = [];

    for (let p of setpermutations(entities).get()) {
        const score = Qpermutations(permutations(p), entities);

        if (score > maxQ) {
            maxQ = score;
            best = [p];
        } else if (score === maxQ) {
            best.push(p);
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
