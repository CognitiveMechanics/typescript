
type Relation = (entity: Entity) => Entity;


export default class Entity
{
	components: Array<Entity>;
	relations: Array<Relation>;


	public constructor (components : Array<Entity> = [], relations: Array<Relation> = [])
	{
		this.components = components;
		this.relations = relations;
	}


	public relation (relation: Relation)
	{
		this.relations.push(relation);
	}
}