import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Scroll: FC = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location]);

    return null;
};
