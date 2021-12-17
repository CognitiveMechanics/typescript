
import ITranscluder from './ITranscluder';
import Entity from '../Entity/Entity';
import Proxy from '../Proxy/Proxy';

export default class DefaultTranscluder implements ITranscluder {

    transclude (entity: Entity, tag: Entity, transclude: Entity) : Entity
    {
        let newComponents : Array<Entity> = [];
        let replaced = false;

        for (let component of entity.components) {
            let subcomponents = component.components;

            if (subcomponents.indexOf(tag) !== -1) {
                if (subcomponents.indexOf(Proxy) !== -1) {
                    newComponents.push(new Entity(
                        component.name,
                        subcomponents.map(c => c === Proxy ? transclude : c)
                    ));
                } else {
                    newComponents.push(new Entity(
                        component.name,
                        [
                            tag,
                            transclude
                        ]
                    ));
                }

                replaced = true;
            } else {
                newComponents.push(component);
            }
        }

        if (! replaced) {
            newComponents.push(new Entity(
                tag.name + "'",
                [
                    tag,
                    transclude
                ]
            ));
        }

        return new Entity(
            entity.name,
            newComponents
        );
    }
}