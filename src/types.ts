export type ProductType = {
    category: number;
    composition: string;
    imageUrl: string;
    price: number;
    rating: number;
    title: string;
    weight: number;
    _id: string;
    salePrice: number;
    isNewProduct: boolean;
    gift: string;
};

export type CartItemType = {
    id: string;
    title: string;
    composition: string;
    weight: number;
    imageUrl: string;
    count: number;
    price: number;
};

export type SortListType = {
    name: string;
    sort: "-rating" | "rating" | "-price" | "price" | "-title" | "title";
};

export type CategoryListType = { id: string; title: string };

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export interface ProductSliceInterface {
    products: ProductType[];
    status: Status;
    errors: string;
}
export type FetchProductsAgrs = {
    activeCategory: string;
    activeSort: string;
    currentPage: number;
};

export interface AuthResponse {
    user: { id: string; name: string };
    token: string;
}

export interface AuthParams {
    login: string;
    password: string;
}

export interface Order {
    orderId: number;
    createdAt: string;
    lastName: string;
    status: string;
    totalPrice: number;
}
