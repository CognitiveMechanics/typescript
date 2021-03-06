
import IKernel from './IKernel';
import IKernelOptions from './IKernelOptions';
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import DotProxy from "../Proxy/DotProxy";
import Debug from "../Debug/Debug";
import NullEntity from "../Entity/NullEntity";
import TrueEntity from "../Entity/TrueEntity";

export const key = new Entity('{key}');
export const keys = new WeakMap<Entity, Entity>();


export default class Kernel implements IKernel
{
    states : Array<Entity> = [];


    public state (entity : Entity) : Entity
    {
        this.states.push(entity);

        return entity;
    }


    public tag (tag : Entity, value : Entity = Proxy) : Entity
    {
        return this.compose(
            '[' + tag.name + ']',
            [
                this.key(tag),
                value
            ]
        );
    }


    public key (entity : Entity) : Entity
    {
        if (keys.has(entity)) {
            return keys.get(entity) as Entity;
        } else {
            const keyed = this.compose(
                '#' + entity.name,
                [
                    entity,
                    key
                ]
            );

            keys.set(entity, keyed);

            return keyed;
        }
    }


    public dot (entity : Entity) : Entity
    {
        let components = [];

        for (let component of entity.components) {
            if (component === Proxy) {
                components.push(DotProxy);
            } else if (component.components.length) {
                components.push(
                    this.dot(component)
                );
            } else {
                components.push(component);
            }
        }

        return new Entity(
            '•' + entity.name + '•',
            components
        );
    }


    public label (name : string, values : Array<string>) : [Entity, Array<Entity>]
    {
        const tag = new Entity('{' + name + '}');

        const type = new Entity(name, [
            tag
        ]);

        let labels = [];

        for (let value of values) {
            labels.push(
                new Entity(value, [
                    tag,
                    new Entity('{' + name + ':' + value + '}')
                ])
            );
        }

        return [type, labels];
    }


    public run (entity : Entity, options : IKernelOptions = {debug: false}) : Entity
    {
        let current = new Entity(entity.name + "'", entity.components);
        let matched = false;

        while (true) {
            if (options.debug) {
                Debug.logStructure(current);
            }

            for (let state of this.states) {
                if (this.match(current, state) === TrueEntity && state.relations.length && ! matched) {
                    current = state.relations[0](current);
                    matched = true;
                }
            }

            if (! matched) {
                break;
            } else {
                matched = false;
            }
        }

        return current;
    }


    public extend(kernel: IKernel) : void
    {
        this.states = [
            ...this.states,
            ...kernel.states
        ];
    }


    public compose(name: string, components: Array<Entity>): Entity
    {
        return new Entity(name, components);
    }


    public enumerate(entity: Entity): Array<Entity>
    {
        return entity.components;
    }


    public extract(entity: Entity, tag: Entity, def: Entity | null = null): Entity
    {
        const keyed = this.key(tag);

        for (let component of entity.components) {
            if (component.components.indexOf(keyed) !== -1) {
                for (let subcomponent of component.components) {
                    if (subcomponent !== keyed) {
                        return subcomponent;
                    }
                }
            }
        }

        if (def instanceof Entity) {
            return def as Entity;
        } else {
            Debug.logStructure(entity);
            Debug.logStructure(tag);
            throw new Error('Invalid extraction');
        }
    }


    public match(match: Entity, against: Entity): Entity
    {
        if (against === Proxy) {
            return TrueEntity;
        } else if (against === DotProxy) {
            return match === Proxy ? TrueEntity : NullEntity;
        } else if (match === against) {
            return TrueEntity;
        } else if (against.components.length) {
            for (let againstComponent of against.components) {
                let matched = false;

                for (let matchComponent of match.components) {
                    if (this.match(matchComponent, againstComponent) !== NullEntity) {
                        matched = true;
                    }
                }

                if (! matched) {
                    return NullEntity;
                }
            }

            return TrueEntity;
        } else {
            return NullEntity;
        }
    }


    public recount(entity: Entity): Array<Entity>
    {
        let entities : Array<Entity> = [];

        entity.relations.forEach((relation) => {
            entities.push(relation(entity));
        });

        return entities;
    }


    public transclude(entity: Entity, tag: Entity, transclude: Entity): Entity
    {
        let newComponents : Array<Entity> = [];
        let replaced = false;

        const keyed = this.key(tag);

        for (let component of entity.components) {
            let subcomponents = component.components;

            if (subcomponents.indexOf(keyed) !== -1) {
                if (subcomponents.indexOf(Proxy) !== -1) {
                    newComponents.push(new Entity(
                        component.name,
                        subcomponents.map(c => c === Proxy ? transclude : c)
                    ));
                } else {
                    newComponents.push(new Entity(
                        component.name,
                        [
                            keyed,
                            transclude
                        ]
                    ));
                }

                replaced = true;
            } else {
                newComponents.push(component);
            }
        }

        if (! replaced) {
            newComponents.push(new Entity(
                tag.name + "'",
                [
                    keyed,
                    transclude
                ]
            ));
        }

        return new Entity(
            entity.name,
            newComponents
        );
    }
}
