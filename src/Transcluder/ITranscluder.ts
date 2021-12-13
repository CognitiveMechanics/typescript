
import Entity from '../Entity/Entity';


export default interface ITranscluder {

    transclude (entity: Entity, tag: Entity, transclude: Entity) : Entity;
}