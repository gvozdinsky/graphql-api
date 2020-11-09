import "reflect-metadata";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { AlbumSchema } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { AlbumType } from "../../types";
import data from "../../data";

let { albums } = data;

@InputType()
class CreateAlbumInputType implements Partial<AlbumType> {
  @Field()
  title: string;

  @Field()
  performer: string;

  @Field()
  price: number;
}

@Resolver(AlbumSchema)
class AlbumResolver {
  @Query(() => [AlbumSchema])
  albums() {
    return albums;
  }

  @Query(() => AlbumSchema, { nullable: true })
  album(@Arg("albumId") albumId: string) {
    return albums.find((album) => album.id === albumId);
  }

  @Mutation(() => AlbumSchema)
  createAlbum(@Arg("albumData") albumData: CreateAlbumInputType) {
    const newId = parseInt(albums[albums.length - 1].id) + 1;
    const newAlbum = { id: newId.toString(), ...albumData };
    albums.push(newAlbum);
    return newAlbum;
  }

  @Mutation(() => Boolean)
  deleteAlbum(@Arg("albumId") albumId: string) {
    let isFound = false;
    albums = albums.filter((album) => {
      if (album.id === albumId) {
        isFound = true;
      }
      return album.id !== albumId;
    });
    return isFound;
  }
}

export { AlbumResolver };
