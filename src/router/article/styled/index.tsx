import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Body = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
export const StyledTitle = styled.h2`
    color: ${(props) => props.theme.colors.background};
    text-align: center;
    font-family: "Playfair Display", sans-serif;
    font-size: 80px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 60px 0;
`;
export const GridContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    //flex-wrap: wrap;
    @media (max-width: 1024px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;
export const Item = styled(motion.div)`
    width: 80%;
    background-color: ${(props) => props.theme.colors.background};
    height: 300px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-radius: 10px;
    @media (max-width: 1024px) {
        width: 350px;
    }
    @media (max-width: 320px) {
        width: calc(100% - 40px);
    }
`;
export const Thumbnail = styled.img`
    width: 350px;
    height: 100%;
    object-fit: cover;
    @media (max-width: 320px) {
        width: calc(100% - 10px);
    }
`;
export const ArticleTitle = styled.h2`
    font-family: "Playfair Display";
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) => props.theme.colors.light};
    width: 100%;
    text-overflow: ellipsis;
    padding: 20px;
    @media (max-width: 1440px) {
        font-size: 30px;
    }
    @media (max-width: 1024px) {
        font-size: 20px;
    }
`;

export const Arrow = styled(Link)`
    width: 200px;
    height: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1024px) {
        display: none;
    }

    &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0)
        );
        transform: skewX(-45deg) translateX(-250px);
        transition: transform 0.3s ease;
    }

    svg {
        font-size: 3000%;
        transition: transform 0.3s ease;
    }

    &:hover:before {
        transform: skewX(-45deg) translateX(500px);
    }

    /* &:hover svg {
        transform: translateX(250px);
    } */
`;
export const ThumbnailContainer = styled.div`
    position: relative;
    width: 350px;
`;
export const CategoryCard = styled.div`
    min-width: 75px;
    height: 25px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
    font-family: "Open Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    position: absolute;
    top: 24px;
    left: 12px;
    padding: 4px 8px;
`;
export const Author = styled.h5`
    position: absolute;
    font-family: "Playfair Display";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) => props.theme.colors.light};
    left: 70%;
    bottom: 40px;
    @media (max-width: 1440px) {
        left: 20px;
    }
    @media (max-width: 1024px) {
        display: none;
    }
`;
export const DateTime = styled.h6`
    position: absolute;
    font-family: "Playfair Display";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) => props.theme.colors.primary};
    left: 70%;
    bottom: 10px;
    @media (max-width: 1440px) {
        left: 20px;
    }
    @media (max-width: 1024px) {
        display: none;
    }
`;
export const NextButton = styled(motion.div)`
    width: 140px;
    height: 50px;
    background-color: ${(props) => props.theme.colors.primary};
    font-family: "Playfair Display";
    font-size: 16px;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 10px;
    margin: 30px 0;
    cursor: pointer;
    &:hover {
        font-weight: 700;
    }
`;
export const TitleContainer = styled.div`
    position: relative;
    width: calc(100% - 550px);
    display: flex;
    justify-content: space-between;

    @media (max-width: 1024px) {
        width: 100%;
        position: absolute;
        bottom: 0;
        background: ${(props) => props.theme.colors.background};
    }
`;
export const StyledLink = styled(Link)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
`;
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1440px;
    align-items: center;
`;
