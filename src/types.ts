export type AlbumType = {
  id: string;
  title: string;
  performer: string;
  price: number;
};

export type UserType = {
  id: string;
  name: string;
};

export type PurchaseType = {
  id: string;
  album_id: string;
  user_id: string;
  amount_paid: number;
};
