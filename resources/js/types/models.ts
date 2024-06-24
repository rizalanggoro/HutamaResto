export type User = {
  id: number;
  name: string;
  email: string;
};

export type Franchise = {
  id: number;
  name: string;
  address: string;
};

export type Menu = {
  id: number;
  franchise_id: number;
  name: string;
  description: string;
  availability: number;
  type: "food" | "beverage";
};

export type Order = {
  id: number;
  user_id: number;
  status: "waiting_payment" | "processing" | "delivering" | "done";
  receipt_path: string | undefined;
};

export type OrderItem = {
  id: number;
  order_id: number;
  menu_id: number;
  count: number;
  is_done: number;
};
