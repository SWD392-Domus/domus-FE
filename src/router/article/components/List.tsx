import React from "react";
import { ListProps } from "../types";
import { GridContainer } from "../styled";
import ArticleItem from "./Item";

const List: React.FC<ListProps> = (props) => {
    return (
        <GridContainer>
            {props.data.map((item, index) => {
                return <ArticleItem key={index} item={item}></ArticleItem>;
            })}
        </GridContainer>
    );
};

export default List;
