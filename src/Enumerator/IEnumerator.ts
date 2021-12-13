
import Entity from '../Entity/Entity';


export default interface IEnumerator {

    enumerate (entity: Entity) : Array<Entity>;
}