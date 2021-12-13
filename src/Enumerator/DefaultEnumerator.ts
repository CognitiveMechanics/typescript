
import IEnumerator from './IEnumerator';
import Entity from '../Entity/Entity';


export default class DefaultEnumerator implements IEnumerator {


    enumerate (entity: Entity) : Array<Entity>
    {
        return entity.components;
    }
}