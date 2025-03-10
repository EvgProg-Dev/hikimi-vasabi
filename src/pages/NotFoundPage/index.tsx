import { Helmet } from "react-helmet-async";
import { FC } from "react";

import { NotFoundBlock } from "../../components/NotFoundBlock";

const NotFound: FC = () => {
    return (
        <>
            <Helmet>
                <title>Сторінка не знайдена 😞 - Hikimi Vasabi</title>
            </Helmet>

            <NotFoundBlock />
        </>
    );
};
export default NotFound;
