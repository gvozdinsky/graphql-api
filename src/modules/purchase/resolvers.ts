import "reflect-metadata";
import {
Arg,
Field,
FieldResolver,
InputType,
Mutation,
Query,
Resolver,
ResolverInterface,
Root,
} from "type-graphql";
import { PurchaseSchema } from "./schema";
import data from "../../data";

let { purchases, albums, users } = data;

@InputType()
class CreatePurchaseInputType {
@Field()
album_id: string;

@Field()
user_id: string;

@Field()
amount_paid: number;
}

@Resolver(PurchaseSchema)
class PurchaseResolver implements ResolverInterface<PurchaseSchema> {
@Query(() => [PurchaseSchema])
purchases(@Arg("userId", { nullable: true }) userId: string, @Arg("albumId",  { nullable: true }) albumId: string) {
  let userFilter = userId ? id => id === userId : _ => true;
  let albumFilter = albumId ? id => id === albumId : _ => true;
  if(!userId && !albumId) {
    return purchases;
  }
  return purchases.filter(({ user_id, album_id }) => userFilter(user_id) && albumFilter(album_id));
}

@FieldResolver()
album(@Root() parent) {
  const { album_id } = parent;
  const album = albums.find((album) => album.id === album_id);
  return album;
}

@FieldResolver()
user(@Root() parent) {
  const { user_id } = parent;
  const user = users.find((user) => user.id === user_id);
  return user;
}

@Mutation(() => PurchaseSchema)
createPurchase(@Arg("purchaseData") purchaseData: CreatePurchaseInputType) {
  const { album_id, user_id, amount_paid } = purchaseData;
  const newId = parseInt(purchases[purchases.length - 1].id) + 1;
  const newPurchase = {
    id: newId.toString(),
    album_id,
    user_id,
    amount_paid,
  };
  purchases.push(newPurchase);
  return newPurchase;
}
}

export { PurchaseResolver };
