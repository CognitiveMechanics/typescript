
import Entity from '../Entity/Entity';
import IComposer from './IComposer';


class RelationComposer implements  IComposer
{


    compose(name: string, components: Array<Entity>): Entity {
        let entity = new Entity(name, components);

        components.forEach((component) => {
            component.relation(() => entity);
            entity.relation(() => component);
        });

        return entity;
    }
}