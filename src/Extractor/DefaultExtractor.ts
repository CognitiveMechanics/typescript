
import IExtractor from './IExtractor';
import Entity from '../Entity/Entity';


export default class DefaultExtractor implements IExtractor {

    extract (entity: Entity, tag: Entity) : Entity | null
    {
        for (let component of entity.components) {
            if (component.components.indexOf(tag) !== -1) {
                for (let subcomponent of component.components) {
                    if (subcomponent !== tag) {
                        return subcomponent;
                    }
                }
            }
        }

        return null;
    }
}