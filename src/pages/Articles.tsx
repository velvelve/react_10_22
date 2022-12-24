import { FC, useEffect, useState } from "react";
import { API } from "../constants";

interface Article {
    id: string;
    title: string;
}

export const Article: FC = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState('')
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setError('')
        setLoading(true);
        setArticles([]);
        try {
            const resp = await fetch(`${API}/v3/articles`);
            const data: Article[] = await resp.json();
            setArticles(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Unknown error')
            }
        } finally {
            setLoading(false)
        }
    };


    return (
        <>
            <h2>Articles</h2>
            {loading && <p>Loading...</p>}
            <button onClick={fetchArticles}>Reload</button>
            <ul>{articles.map((article) => (
                <li key={article.id}>{article.title}</li>
            ))}
            </ul>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}