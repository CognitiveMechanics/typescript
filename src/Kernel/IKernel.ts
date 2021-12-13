
import Entity from '../Entity/Entity';
import IComposer from '../Composer/IComposer';
import IEnumerator from '../Enumerator/IEnumerator';
import IExtractor from '../Extractor/IExtractor';
import IMatcher from '../Matcher/IMatcher';
import IRecounter from '../Recounter/IRecounter';
import ITranscluder from '../Transcluder/ITranscluder';

export default interface IKernel extends IComposer, IEnumerator, IExtractor, IMatcher, IRecounter, ITranscluder
{


    define (key: string, entity: Entity) : Entity;
    run (state: Entity) : Entity;
}