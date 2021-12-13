
import Entity from '../Entity/Entity';


export default interface IExtractor {

    extract (entity: Entity, tag: Entity) : Entity | null;
}