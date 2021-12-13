
import Entity from '../Entity/Entity';
import IComposer from './IComposer';


export default class DefaultComposer implements  IComposer
{


    public compose(components: Array<Entity>): Entity {
       return new Entity(components);
    }
}