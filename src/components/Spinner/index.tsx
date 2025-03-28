import { Helmet } from "react-helmet-async";

export const Spinner = () => {
    return (
        <>
            <Helmet>
                <title>Завантаження сторінки... | Hikimi Vasabi</title>
            </Helmet>
            <div className="spinner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <circle
                        fill="#FF0000"
                        stroke="#FF0000"
                        strokeWidth={15}
                        r={15}
                        cx={40}
                        cy={100}
                    >
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            dur={2}
                            values="1;0;1;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.4"
                        />
                    </circle>
                    <circle
                        fill="#FF0000"
                        stroke="#FF0000"
                        strokeWidth={15}
                        r={15}
                        cx={100}
                        cy={100}
                    >
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            dur={2}
                            values="1;0;1;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.2"
                        />
                    </circle>
                    <circle
                        fill="#FF0000"
                        stroke="#FF0000"
                        strokeWidth={15}
                        r={15}
                        cx={160}
                        cy={100}
                    >
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            dur={2}
                            values="1;0;1;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin={0}
                        />
                    </circle>
                </svg>
            </div>
        </>
    );
};
