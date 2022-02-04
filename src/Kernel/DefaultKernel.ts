
import Kernel from './Kernel';
import Entity from "../Entity/Entity";
import Proxy from "../Proxy/Proxy";

export const DefaultKernel = new Kernel;

export const C = (name : string, components: Array<Entity> = []) => DefaultKernel.compose(name, components);
export const E = (entity : Entity) => DefaultKernel.enumerate(entity);
export const Y = (match : Entity, against : Entity) => DefaultKernel.match(match, against);
export const R = (entity : Entity) => DefaultKernel.recount(entity);
export const T = (a : Entity, b : Entity, c : Entity) => DefaultKernel.transclude(a, b, c);
export const X = (a : Entity, b : Entity, def: Entity | null = null) => DefaultKernel.extract(a, b, def);
export const O = (entities : Array<Entity>) => DefaultKernel.compose('@', entities);

export const k = (a : Entity) => DefaultKernel.key(a);
export const dot = (a : Entity) => DefaultKernel.dot(a);
export const tag = (tag : Entity, entity : Entity = Proxy) => DefaultKernel.tag(tag, entity);