export interface TitleProps {
    title: string;
}
export interface ArticleItem {
    id: number;
    category: string;
    title: string;
    createdAt: string;
    author: string;
    images: string[];
}
export interface ListProps {
    data: ArticleItem[];
}
