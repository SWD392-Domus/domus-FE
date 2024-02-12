import React from "react";
import { Body, Container, Image, Title } from "./styled";
import { Props } from "./type";
import { picture1 } from "@/assets/image/home";
import { slideInFromTop } from "@/utils/motion";

const CustomerHeader: React.FC<Props> = (props) => {
    return (
        <Container initial="hidden" animate="visible">
            <Body variants={slideInFromTop}>
                <Image src={picture1} />
                <Title>{props.title}</Title>
            </Body>
        </Container>
    );
};

export default CustomerHeader;
