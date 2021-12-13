
import Kernel from './Kernel';
import Entity from "../Entity/Entity";

export const DefaultKernel = new Kernel;

export const C = (a : string, b: Array<Entity>) => DefaultKernel.compose(a, b);
export const E = (a : Entity) => DefaultKernel.enumerate(a);
export const M = (a : Entity, b : Entity) => DefaultKernel.match(a, b);
export const R = (a : Entity) => DefaultKernel.recount(a);
export const T = (a : Entity, b : Entity, c : Entity) => DefaultKernel.transclude(a, b, c);
export const X = (a : Entity, b : Entity) => DefaultKernel.extract(a, b);