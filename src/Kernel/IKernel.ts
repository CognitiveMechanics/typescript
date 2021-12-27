
import Entity from '../Entity/Entity';
import IKernelOptions from "./IKernelOptions";


export default interface IKernel
{
    states : Array<Entity>;

    state (entity: Entity) : Entity;
    tag (entity: Entity) : Entity;
    key (entity : Entity) : Entity;
    label (name : string, values : Array<string>) : [Entity, Array<Entity>];
    dot (entity : Entity) : Entity;

    run (state : Entity, options : IKernelOptions) : Entity;
    extend (kernel: IKernel) : void;

    compose(name: string, components: Array<Entity>): Entity;
    enumerate(entity: Entity): Array<Entity>;
    extract(entity: Entity, tag: Entity, def: Entity | null): Entity | null;
    match(match: Entity, against: Entity): number;
    recount(entity: Entity): Array<Entity>;
    transclude(entity: Entity, tag: Entity, transclude: Entity): Entity;
}