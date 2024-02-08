import { motion } from "framer-motion";
import styled from "styled-components";

export const Body = styled(motion.div)`
    background-color: ${(props) => props.theme.colors.background};
    padding: 30px 90px;
    position: relative;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
export const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1440px;
    width: 100%;
    align-items: center;
    height: 100%;
    background-color: white;
    border-radius: 10px;
`;
