import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class UserSchema {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}

export { UserSchema };
