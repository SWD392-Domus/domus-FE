import React from "react";
import { ArticleContainer, Body } from "./styled";
import CustomerHeader from "@/components/CustomerHeader";
import { articleData } from "./constants";
import parse from "html-react-parser";
const ArticleDetail: React.FC = () => {
    return (
        <Body>
            <CustomerHeader title={articleData.title} />
            <ArticleContainer>{parse(articleData.content)}</ArticleContainer>
        </Body>
    );
};

export default ArticleDetail;
