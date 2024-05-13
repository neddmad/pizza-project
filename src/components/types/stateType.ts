export interface ReadOrderInterface {
  cart: [];
  estimatedDelivery: string;
  orderId?: number | null;
  orderedAt: string;
  restuarantId: number;
  status: string;
  totalPrice: number;
}
export interface KeyItemsInterface {
  id: number;
  category: string;
  name: string;
  price: number;
  quantity: number | boolean;
  topping?: Array<string>;
}
export interface ItemsInterface {
  id: number;
  name: string;
  category: string;
  topping: [];
  price: number;
}
export interface RestaurantInterface {
  address1: string;
  address2: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface DataInterface {
  orderId: number;
  totalPrice: number;
  orderedAt: string;
  esitmatedDelivery: string;
  status: string;
}
