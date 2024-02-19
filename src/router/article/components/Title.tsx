import React from "react";
import { TitleProps } from "../types";
import { StyledTitle } from "../styled";

const Title: React.FC<TitleProps> = (props) => {
    return <StyledTitle>"{props.title}"</StyledTitle>;
};

export default Title;
