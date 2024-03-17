import { ArticleContainer, Body } from "./styled";
import CustomerHeader from "@/components/CustomerHeader";
// import { articleData } from "./constants";
import React, { useEffect, useState } from "react";
import { getArticleById } from "./usecase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
// import { useNavigate } from "react-router-dom";
import HTMLReactParser from 'html-react-parser/lib/index';
const ArticleDetail: React.FC = () => {
    // const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const name: string = useSelector(selector.title);
    const description: string = useSelector(selector.content);
    const [updated, setUpdated] = useState(false);

    async function fetchData() {
        if (id) {
            try {
                const response = await getArticleById(id);
                if (response) {
                    dispatch(actions.setArticle(response));
                    // console.log(response)
                    // dispatch(actions.getArticleInfo());
                    setUpdated(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="min-h-screen">
            {updated && (
                <Body>
                    <CustomerHeader title={name} />
                    <ArticleContainer>
                        <div className="w-[75%] mx-auto mb-10 border-2 py-7 px-10 rounded-2xl">
                            <div className='flex flex-col items-center justify-center gap-4'>
                                {HTMLReactParser(description)}
                            </div>
                        </div>
                    </ArticleContainer>
                </Body>

            )}
        </div>
    );
};

export default ArticleDetail;
