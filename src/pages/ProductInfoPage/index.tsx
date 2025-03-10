import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { Helmet } from "react-helmet-async";

import { ProductType } from "src/types";
import NotFound from "../NotFoundPage";
import { ProductInfoCard } from "../../components/ProductInfoCard";
import { Spinner } from "../../components/Spinner";
import { ErrorPage } from "../ErrorPage";
import { toast } from "react-toastify";

const ProductInfo: FC = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<ProductType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");

    const fetchProduct = async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            const { data } = await axios.get(`/products/${id}`);
            setData(data);
        } catch (error: any) {
            if (error.response) {
                console.error("Axios error response:", error.response);
                setError(error.response.data?.message || "Server error");
            } else if (error.request) {
                console.error("Axios error request:", error.request);
                setError("No response from server");
            } else {
                console.error("Unexpected error:", error.message);
                setError("Unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (isLoading) {
        return <Spinner />;
    }
    if (error) {
        toast.error(`Виникла помилка! ${error}`);
        return <ErrorPage errors={error} />;
    }

    if (!data) {
        return <NotFound />;
    }
    return (
        <>
            <Helmet>
                <title>{data.title} - Hikimi Vasabi</title>
            </Helmet>

            <ProductInfoCard {...data} />
        </>
    );
};

export default ProductInfo;
