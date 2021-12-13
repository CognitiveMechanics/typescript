
import Entity from '../Entity/Entity';


export default interface IMatcher {

    match (match: Entity, against: Entity) : number;
}