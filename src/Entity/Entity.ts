
type Relation = (entity: Entity) => Entity;


export default class Entity
{
	name: string;
	components: Array<Entity>;
	relations: Array<Relation>;


	public constructor (name: string, components : Array<Entity> = [], relations: Array<Relation> = [])
	{
		this.name = name;
		this.components = components;
		this.relations = relations;
	}


	public relation (relation: Relation)
	{
		this.relations.push(relation);
	}
}