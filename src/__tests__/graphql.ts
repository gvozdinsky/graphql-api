import { graphQLCall } from "../test-utils";
import initialData from "../data";

let data;
beforeEach(() => {
  data = initialData;
});

const GET_ALBUMS = `
  query getAlbums {
    albums {
      id
      title
      performer
      price
    }
  }
`;

const GET_ALBUM_BY_ID = `
  query getAlbumById($id: String!) {
    album(albumId: $id) {
      id
      title
      performer
      price
    }
  }
`;

const CREATE_ALBUM = `
  mutation createAlbum($data: CreateAlbumInputType!) {
    createAlbum(albumData: $data) {
      id
      title
      performer
      price
    }
  }
`;

const DELETE_ALBUM = `
  mutation deleteAlbum($id: String!) {
    deleteAlbum(albumId: $id)
  }
`;

const CREATE_PURCHASE = `
  mutation createPurchase($data: CreatePurchaseInputType!) {
    createPurchase(purchaseData: $data) {
      id
      user {
        id
        name
      }
      album {
        id
        title
        performer
        price
      }
      amount_paid
      }
  }
`;

const GET_PURCHASES = `
query getPurchases($userId: String, $albumId: String) {
  purchases(userId: $userId, albumId: $albumId) {
    id
    user {
      id
      name
    }
    album {
      id
      title
      performer
      price
    }
    amount_paid
  }
}
`;

const findById = (id) => (item) => item.id === id;

describe("Album", () => {
  it("get albums", async () => {
    const res = await graphQLCall({ query: GET_ALBUMS });
    expect(res.data.albums).toMatchObject(data.albums);
  });

  it("get album by id", async () => {
    const variables = { id: "1" };
    const res = await graphQLCall({ query: GET_ALBUM_BY_ID, variables });
    expect(res.data.album).toMatchObject(
      data.albums.find(findById(variables.id))
    );
  });

  it("create new album", async () => {
    const variables = {
      data: { title: "Album#3", performer: "Artist #99", price: 0.99 },
    };
    const res = await graphQLCall({ query: CREATE_ALBUM, variables });
    expect(res.data.createAlbum).toMatchObject(
      data.albums[data.albums.length - 1]
    );
  });

  it("delete album", async () => {
    const variables = {
      id: "1"
    };
    const res = await graphQLCall({ query: DELETE_ALBUM, variables });
    expect(res.data.deleteAlbum).toBe(true);
  });
});

describe("Purchases", () => {
  it("get all purchases", async () => {
    const res = await graphQLCall({ query: GET_PURCHASES });
    expect(res.data.purchases).toHaveLength(3);
  });

  it("get purchases by user id", async () => {
    const variables = {
      "userId": "1"
    };
    const res = await graphQLCall({ query: GET_PURCHASES, variables });
    expect(res.data.purchases).toHaveLength(2);
    expect(res.data.purchases[0].user.id).toBe(variables.userId);
    expect(res.data.purchases[1].user.id).toBe(variables.userId);
  });

  it("get purchases by album id", async () => {
    const variables = {
      "albumId": "1"
    };
    const res = await graphQLCall({ query: GET_PURCHASES, variables });
    expect(res.data.purchases).toHaveLength(2);
    expect(res.data.purchases[0].album.id).toBe(variables.albumId);
    expect(res.data.purchases[1].album.id).toBe(variables.albumId);
  });

  it("create purchase", async () => {
    const variables = {
      data: { album_id: "2", user_id: "2", amount_paid: 9.99 },
    };
    const res = await graphQLCall({ query: CREATE_PURCHASE, variables });
    expect(res.data.createPurchase.user.id).toBe(variables.data.user_id);
    expect(res.data.createPurchase.album.id).toBe(variables.data.album_id);
    expect(res.data.createPurchase.amount_paid).toBe(
      variables.data.amount_paid
    );
  });
});
