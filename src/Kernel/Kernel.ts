
import IKernel from './IKernel';

import IComposer from '../Composer/IComposer';
import DefaultComposer from '../Composer/DefaultComposer';
import IEnumerator from '../Enumerator/IEnumerator';
import DefaultEnumerator from '../Enumerator/DefaultEnumerator';
import IExtractor from '../Extractor/IExtractor';
import DefaultExtractor from '../Extractor/DefaultExtractor';
import IMatcher from '../Matcher/IMatcher';
import DefaultMatcher from '../Matcher/DefaultMatcher';
import IRecounter from '../Recounter/IRecounter';
import FullRecounter from '../Recounter/FullRecounter';
import ITranscluder from '../Transcluder/ITranscluder';
import DefaultTranscluder from '../Transcluder/DefaultTranscluder';
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";
import DotProxy from "../Proxy/DotProxy";
import Debug from "../Debug/Debug";


export default class Kernel implements IKernel
{
    states : Array<Entity> = [];

    composer : IComposer;
    enumerator : IEnumerator;
    extractor : IExtractor;
    matcher : IMatcher;
    recounter : IRecounter;
    transcluder : ITranscluder;


    public constructor (
        composer : IComposer = new DefaultComposer,
        enumerator : IEnumerator = new DefaultEnumerator,
        extractor : IExtractor = new DefaultExtractor,
        matcher : IMatcher = new DefaultMatcher,
        recounter : IRecounter = new FullRecounter,
        transcluder : ITranscluder = new DefaultTranscluder
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
        return this.compose(
            '[' + entity.name + ']',
            [
                entity,
                Proxy
            ]
        );
    }


    public dot (entity : Entity) : Entity
    {
        let components = [];

        for (let component of entity.components) {
            if (component === Proxy) {
                components.push(DotProxy);
            } else if (component.components.length) {
                components.push(
                    this.dot(component)
                );
            } else {
                components.push(component);
            }
        }

        return new Entity(
            '•' + entity.name + '•',
            components
        );
    }


    public label (name : string, values : Array<string>) : [Entity, Array<Entity>]
    {
        const tag = new Entity('{' + name + '}');

        const type = new Entity(name, [
            tag
        ]);

        let labels = [];

        for (let value of values) {
            labels.push(
                new Entity(value, [
                    tag,
                    new Entity('{' + name + ':' + value + '}')
                ])
            );
        }

        return [type, labels];
    }


    public run (entity : Entity) : Entity
    {
        let current = new Entity(entity.name + "'", entity.components);
        let matched = false;

        while (true) {
            for (let state of this.states) {
               if (this.matcher.match(current, state) === 1 && state.relations.length && ! matched) {
                   current = state.relations[0](current);
                   matched = true;
               }
            }

            if (! matched) {
                break;
            } else {
                matched = false;
            }
        }

        return current;
    }


    public extend(kernel: IKernel) : void
    {
        this.states = [
            ...this.states,
            ...kernel.states
        ];
    }


    public compose(name: string, components: Array<Entity>): Entity
    {
        return this.composer.compose(name, components);
    }


    public enumerate(entity: Entity): Array<Entity>
    {
        return this.enumerator.enumerate(entity);
    }


    public extract(entity: Entity, tag: Entity): Entity | null
    {
        return this.extractor.extract(entity, tag);
    }


    public match(match: Entity, against: Entity): number
    {
        return this.matcher.match(match, against);
    }


    public recount(entity: Entity): Array<Entity>
    {
        return this.recounter.recount(entity);
    }


    public transclude(entity: Entity, tag: Entity, transclude: Entity): Entity
    {
        return this.transcluder.transclude(entity, tag, transclude);
    }
}