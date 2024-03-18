import { Button } from "@/components/ui/Button/Button";
import React, { useEffect, useState } from "react";
import { getArticleById } from "./usecase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
import { useNavigate } from "react-router-dom";
import HTMLReactParser from 'html-react-parser/lib/index';
import { DeleteButton } from './components/DeleteButton';

interface Props { }

const ArticleDetails: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const id: string = useSelector(selector.id);
    const name: string = useSelector(selector.title);
    const description: string = useSelector(selector.content);
    const [updated, setUpdated] = useState(false);

    async function fetchData() {
        if (articleId) {
            try {
                const response = await getArticleById(articleId);
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
        <>
            <div className="my-7 text-2xl font-semibold">
                Article - {name}
            </div>
            {updated && (
                <div className="flex flex-row-reverse justify-between">
                    <div>
                        <div className="mt-2">
                            <DeleteButton id={id}></DeleteButton>
                        </div>
                        <div className="mt-2">
                            <Button onClick={() => navigate(`${location.pathname}/update`)} variant={'yellowCustom'} className="cursor-pointer w-40">Update</Button>
                        </div>
                    </div>
                    <div className="w-[75%] mx-auto mb-10 border-2 py-7 px-10 rounded-2xl">
                        <div>
                            <p className="text-xl font-bold border-b-2 border-slate-400 w-fit mb-4">{name}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            {HTMLReactParser(description)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ArticleDetails;
