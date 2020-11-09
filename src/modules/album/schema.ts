import "reflect-metadata";
import { Field, Float, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
class AlbumSchema {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  performer: string;

  @Field(() => Float)
  price: number;
}

export { AlbumSchema };
