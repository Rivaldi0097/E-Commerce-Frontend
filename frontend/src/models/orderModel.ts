export interface product {
  product: {
    image: string;
    price: number;
    title: string;
    _id: string;
  };
  quantity: number;
}

export interface orderModel {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  products: product[];
  totalAmount: number;
  createdAt: string;
}
