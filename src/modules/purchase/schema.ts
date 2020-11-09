import "reflect-metadata";
import { Field, Float, ID, ObjectType } from "type-graphql";
import { AlbumType, UserType } from "../../types";
import { AlbumSchema } from "../album/schema";
import { UserSchema } from "../user/schema";

@ObjectType()
class PurchaseSchema {
  @Field((type) => ID)
  id: string;

  @Field((type) => UserSchema)
  user: UserType;

  @Field((type) => AlbumSchema)
  album: AlbumType;

  @Field(() => Float)
  amount_paid: number;
}

export { PurchaseSchema };
