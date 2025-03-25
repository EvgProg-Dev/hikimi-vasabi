import { CartItemType } from "src/types";

export const calcTotalCart = (items: CartItemType[]) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.count, 0);
    const totalCount = items.reduce((acc, item) => acc + item.count, 0);
    return {totalCount, totalPrice}
};
