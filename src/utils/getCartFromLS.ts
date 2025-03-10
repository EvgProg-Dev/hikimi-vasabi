import { calcTotalCart } from "./calcTotalCart";

export const getCartFromLS = () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];
    const totalCart = calcTotalCart(items)

    return {
        items,
        totalCart,
    };
};
