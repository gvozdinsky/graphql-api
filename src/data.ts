import { AlbumType, PurchaseType, UserType } from "./types";

class MockData {
  albums: Array<AlbumType> = [
    {
      id: "1",
      title: "Album #1",
      performer: "Artist 1",
      price: 4.99,
    },
    {
      id: "2",
      title: "Album #2",
      performer: "Artist 2",
      price: 9.99,
    },
  ];

  users: Array<UserType> = [
    {
      id: "1",
      name: "User 1",
    },
    {
      id: "2",
      name: "User 2",
    },
  ];

  purchases: Array<PurchaseType> = [
    {
      id: "1",
      album_id: "1",
      user_id: "1",
      amount_paid: 4.99,
    },
    {
      id: "2",
      album_id: "2",
      user_id: "1",
      amount_paid: 9.99,
    },
    {
      id: "3",
      album_id: "1",
      user_id: "2",
      amount_paid: 4.99,
    },
  ];
}

const mockData = new MockData();

export default mockData;
