import React from "react";
import { Body, InfoContainer, NextButton } from "./styled";
import CustomerHeader from "@/components/CustomerHeader";
import { articleData, headerTitle } from "./constants";
import List from "./components/List";

const ArticleList: React.FC = () => {
    return (
        <Body initial="hidden" animate="visible">
            <CustomerHeader title={headerTitle} />
            {/* <Title title="Choose one of our finest packages and start design your own home" /> */}
            <InfoContainer>
                <List data={articleData} />
                <NextButton>Show More</NextButton>
            </InfoContainer>
        </Body>
    );
};

export default ArticleList;
