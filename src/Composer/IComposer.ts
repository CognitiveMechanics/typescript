
import Entity from '../Entity/Entity';


export default interface IComposer {

    compose (components: Array<Entity>) : Entity;
}