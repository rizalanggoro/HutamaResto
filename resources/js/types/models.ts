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
    id_franchise: number;
    name: string;
    description: string;
    availability: boolean;
    type: "food" | "beverage";
};

export type Order = {
    id: number;
    id_user: number;
};

export type OrderItem = {
    id: number;
    id_order: number;
    id_menu: number;
    count: number;
};
