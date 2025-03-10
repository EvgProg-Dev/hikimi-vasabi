import { FC } from "react";
import ContentLoader from "react-content-loader";

export const SkeletonProductCard: FC = () => (
    <ContentLoader
        className="skeleton"
        speed={3}
        width={260}
        height={480}
        viewBox="0 0 260 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#e0e0e0"
    >
        <rect x="0" y="0" rx="8" ry="8" width="260" height="235" />
        <rect x="0" y="245" rx="8" ry="8" width="260" height="40" />
        <rect x="0" y="310" rx="8" ry="8" width="260" height="34" />
        <rect x="30" y="365" rx="8" ry="8" width="70" height="30" />
        <rect x="122" y="365" rx="0" ry="0" width="5" height="30" />
        <rect x="150" y="365" rx="8" ry="8" width="70" height="30" />
        <rect x="0" y="425" rx="8" ry="8" width="260" height="40" />
    </ContentLoader>
);
