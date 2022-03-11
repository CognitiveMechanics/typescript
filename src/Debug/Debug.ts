import Entity from "../Entity/Entity";
const util = require('util')


export default class Debug {

    static structure (entity : Entity, state : Record<string, any> = {}) {
        state[entity.name] = {};
        let isNum = false;

        for (let component of entity.components) {
            if (component.name == '#num') {
                isNum = true;
                break;
            }
        }

        if (! isNum) {
            for (let component of entity.components) {
                Debug.structure(component, state[entity.name]);
            }
        }

        return state;
    }

    static logStructure (entity : any) {
        let state;

        if (entity instanceof Entity) {
            state = Debug.structure(entity);
        } else {
            state = entity;
        }

        console.log(util.inspect(state, {showHidden: false, depth: null}))
    }

}
