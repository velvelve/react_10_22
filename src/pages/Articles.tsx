import { AsyncThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../constants';
import { StoreState } from '../store';
import { fetchArticles } from '../store/articles/slice';

interface Article {
  id: string;
  title: string;
}

export const Article: FC = () => {
  const loading = useSelector((state: StoreState) => state.articles.loading);
  const articles = useSelector((state: StoreState) => state.articles.articles);
  const error = useSelector((state: StoreState) => state.articles.error);

  const dispatch = useDispatch<ThunkDispatch<StoreState, void, any>>();

  const handleFetchData = () => {
    dispatch(fetchArticles());
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <h2>Articles</h2>
      {loading && <p>Loading...</p>}
      <button onClick={handleFetchData}>Reload</button>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};
