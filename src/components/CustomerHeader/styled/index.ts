import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
    background-color: ${(props) => props.theme.colors.background};
    width: 100%;
`;
export const Image = styled.img`
    width: 90%;
    opacity: 0.3;
    max-height: 684px;
    padding-bottom: 30px;
    position: absolute;
`;
export const Title = styled.h1`
    text-align: center;
    font-family: "Playfair Display";
    font-size: 90px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    z-index: 1;
    color: ${(props) => props.theme.colors.light};
`;
export const Body = styled(motion.div)`
    background-color: ${(props) => props.theme.colors.background};
    padding: 30px 90px;
    position: relative;
    width: 100%;
    min-height: 647px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
