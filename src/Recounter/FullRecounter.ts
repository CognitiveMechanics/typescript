
import IRecounter from './IRecounter';
import Entity from '../Entity/Entity';


export default class FullRecounter implements IRecounter {


    recount (entity: Entity) : Array<Entity>
    {
        let entities : Array<Entity> = [];

        entity.relations.forEach((relation) => {
            entities.push(relation(entity));
        });

        return entities;
    }
}