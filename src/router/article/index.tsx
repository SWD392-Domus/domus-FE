import React, { useEffect, useState } from "react";
import { Body, InfoContainer, NextButton } from "./styled";
import CustomerHeader from "@/components/CustomerHeader";
import { articleData, headerTitle } from "./constants";
import List from "./components/List";
import { ArticleItem } from "./types/index.ts";
import { getArticlesPaging } from "./usecase/getArticlesPaging.ts";

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [searchField, setSearchField] = useState("title");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [descending, setDescending] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [pageIndex, setPageIndex] = useState(1);

    async function getArticlesService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number) {
        const res = await getArticlesPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setArticles(res.articlesItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getArticlesService(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex);
    }, [searchField,
        searchValue,
        sortField,
        descending,
        pageSize,
        pageIndex]);
    return (
        <Body initial="hidden" animate="visible">
            <CustomerHeader title={headerTitle} />
            {/* <Title title="Choose one of our finest packages and start design your own home" /> */}
            <InfoContainer>
                <List data={articles} />
                {/* <NextButton>Show More</NextButton> */}
            </InfoContainer>
        </Body>
    );
};

export default ArticleList;
