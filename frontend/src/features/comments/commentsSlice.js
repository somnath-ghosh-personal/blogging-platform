import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import ENDPOINTS from '../../api/endpoints';

const initialState = {
  comments: [],
  status: 'idle', 
  error: null,
};

// Fetch All Comments for a Post 
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.COMMENTS.FETCH_BY_POST_ID(postId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Add New Comment 
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.COMMENTS.ADD(postId), commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.status = 'idle';
      state.error = null;
    },
    clearCommentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add Comment
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearComments, clearCommentError } = commentsSlice.actions;

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;
