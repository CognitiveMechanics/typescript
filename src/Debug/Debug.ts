import Entity from "../Entity/Entity";
const util = require('util')


export default class Debug {

    static structure (entity : Entity, state : Record<string, any> = {}) {
        state[entity.name] = {};

        for (let component of entity.components) {
            Debug.structure(component, state[entity.name]);
        }

        return state;
    }

    static logStructure (entity: Entity) {
        let state = Debug.structure(entity);

        console.log(util.inspect(state, {showHidden: false, depth: null}))
    }

}