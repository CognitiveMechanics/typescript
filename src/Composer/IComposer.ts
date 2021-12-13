
import Entity from '../Entity/Entity';


export default interface IComposer {

    compose (name:string, components: Array<Entity>) : Entity;
}