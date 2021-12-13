
import IKernel from './IKernel';

import IComposer from '../Composer/IComposer';
import IEnumerator from '../Enumerator/IEnumerator';
import IExtractor from '../Extractor/IExtractor';
import IMatcher from '../Matcher/IMatcher';
import IRecounter from '../Recounter/IRecounter';
import ITranscluder from '../Transcluder/ITranscluder';
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";


export default class DefaultKernel implements IKernel
{
    states : Array<Entity> = [];
    composer : IComposer;
    enumerator : IEnumerator;
    extractor : IExtractor;
    matcher : IMatcher;
    recounter : IRecounter;
    transcluder : ITranscluder;


    public constructor (
        composer : IComposer,
        enumerator : IEnumerator,
        extractor : IExtractor,
        matcher : IMatcher,
        recounter : IRecounter,
        transcluder : ITranscluder
    ) {
        this.composer = composer;
        this.enumerator = enumerator;
        this.extractor = extractor;
        this.matcher = matcher;
        this.recounter = recounter;
        this.transcluder = transcluder;
    }


    public state (entity : Entity) : Entity
    {
        this.states.push(entity);

        return entity;
    }


    public tag (entity : Entity) : Entity
    {
        return this.composer.compose(
            '[' + entity.name + ']',
            [
                entity,
                Proxy
            ]
        );
    }


    public run (entity : Entity) : Entity
    {
        let current = new Entity(entity.name + "'", entity.components);

        while (true) {
            let matched = false;

            this.states.forEach((state) => {
               if (this.matcher.match(current, state) && state.relations.length) {
                   current = state.relations[0](current);
                   matched = true;
               }
            });

            if (! matched) {
                break;
            }
        }

        return current;
    }
}