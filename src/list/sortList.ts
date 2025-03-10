import { SortListType } from "src/types";

export const sortList: SortListType[] = [
    { name: "рейтингом ▼", sort: "-rating" },
    { name: "рейтингом ▲", sort: "rating" },
    { name: "вартістю ▼", sort: "-price" },
    { name: "вартістю ▲", sort: "price" },
    { name: "назвою ▼", sort: "-title" },
    { name: "назвою ▲", sort: "title" },
];
