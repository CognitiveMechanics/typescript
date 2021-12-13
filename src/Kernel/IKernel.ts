
import Entity from '../Entity/Entity';
import IComposer from '../Composer/IComposer';
import IEnumerator from '../Enumerator/IEnumerator';
import IExtractor from '../Extractor/IExtractor';
import IMatcher from '../Matcher/IMatcher';
import IRecounter from '../Recounter/IRecounter';
import ITranscluder from '../Transcluder/ITranscluder';

export default interface IKernel extends IComposer, IEnumerator, IExtractor, IMatcher, IRecounter, ITranscluder
{
    states : Array<Entity>;

    composer : IComposer;
    enumerator : IEnumerator;
    extractor : IExtractor;
    matcher : IMatcher;
    recounter : IRecounter;
    transcluder : ITranscluder;

    state (entity: Entity) : Entity;
    tag (entity: Entity) : Entity;
    label (name : string, values : Array<string>) : [Entity, Array<Entity>];
    dot (entity : Entity) : Entity;
    run (state: Entity) : Entity;
    extend (kernel: IKernel) : void;
}