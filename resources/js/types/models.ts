export type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  image: string | undefined;
};

export type Franchise = {
  id: number;
  name: string;
  address: string;
  is_open: number;
  image: string;
};

export type Menu = {
  id: number;
  franchise_id: number;
  name: string;
  description: string;
  availability: number;
  type: "food" | "beverage";
  price: number;
  image: string | undefined;
};

export type Order = {
  id: number;
  user_id: number;
  status:
    | "waiting_payment"
    | "waiting_payment_verification"
    | "processing"
    | "delivering"
    | "done";
  receipt_path: string | undefined;
  message: string | undefined;
  type: "dine-in" | "delivery-order";
  created_at: Date;
};

export type OrderItem = {
  id: number;
  order_id: number;
  menu_id: number;
  count: number;
  is_done: number;
};

export type Review = {
  id: number;
  star: number;
  review: string;
  user_id: number;
  order_id: number;
  franchise_id: number;
  created_at: string;
};
