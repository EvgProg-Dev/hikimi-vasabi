import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { FC } from "react";

import { RootState } from "src/redux/store";

import { CartBlock } from "./../../components/Cart/CartBlock";
import { CartEmpty } from "./../../components/Cart/CartEmpty";



const Cart: FC = () => {
    const { items } = useSelector((state: RootState) => state.cart);

    
    return (
        <>
            <Helmet>
                <title>Кошик - Hikimi Vasabi</title>
            </Helmet>
            {!items.length ? <CartEmpty /> : <CartBlock />}
        </>
    );
};

export default Cart;
