
import Entity from '../Entity/Entity';


export default interface IRecounter {

    recount (entity: Entity) : Array<Entity>;
}