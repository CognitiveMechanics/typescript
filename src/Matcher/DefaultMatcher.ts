
import IMatcher from './IMatcher';

import Entity from '../Entity/Entity';
import Proxy from '../Proxy/Proxy';
import DotProxy from '../Proxy/DotProxy';

export default class DefaultMatcher implements IMatcher {

    match (match: Entity, against: Entity) : number
    {
        if (against === Proxy) {
            return 1;
        } else if (against === DotProxy) {
            return match === Proxy ? 1 : 0;
        } else if (match === against) {
            return 1;
        } else if (against.components.length) {
            let count = against.components.length;
            let score = 0;

            for (let againstComponent of against.components) {
                let matches : Array<number> = [];

                for (let matchComponent of match.components) {
                    matches.push(this.match(matchComponent, againstComponent));
                }

                if (matches.length) {
                    score += Math.max(...matches);
                }
            }

            return score / count;
        } else {
            return 0;
        }
    }
}