
import Entity from '../Entity/Entity';
import IComposer from './IComposer';


class RelationComposer implements  IComposer
{


    compose(components: Array<Entity>): Entity {
        let entity = new Entity(components);

        components.forEach((component) => {
            component.relation(() => entity);
            entity.relation(() => component);
        });

        return entity;
    }
}