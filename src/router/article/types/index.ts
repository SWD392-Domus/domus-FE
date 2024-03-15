export interface TitleProps {
  title: string;
}
export interface ArticleItem {
  id: string;
  articleCategory: { name: string };
  title: string;
  content: string;
  articleImages: [];
}

export interface ListProps {
  data: ArticleItem[];
}
