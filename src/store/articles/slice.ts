import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../constants';
import { ArticlesState, Article } from './types';

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: '',
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchArticles.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.articles = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchArticles.rejected, (state, action: any) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch(`${API}/v3/articles`);
    return response.json();
  }
);

export const { getArticles } = articleSlice.actions;
export const articlesReducer = articleSlice.reducer;
