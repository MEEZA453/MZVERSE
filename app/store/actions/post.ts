import * as api from '../../api';
import { AppDispatch } from '../store';

// Create Post
export const createPostAction = (formData: FormData, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'CREATE_POST_REQUEST' });
    const { data } = await api.createPost(formData, token);
    dispatch({ type: 'CREATE_POST_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'CREATE_POST_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};

export const deletePostAction = (id: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'DELETE_POST_REQUEST' });
    await api.deletePost(id, token); // Call API
    dispatch({ type: 'DELETE_POST_SUCCESS', payload: id });
    return id;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'DELETE_POST_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
}
// Fetch All Posts
export const getPostsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });
    const { data } = await api.getPosts();
    dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FETCH_POSTS_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};

// Fetch Single Post
export const getPostByIdAction = (id: string) => async (dispatch: AppDispatch) => {

  try {
    dispatch({ type: 'FETCH_POST_REQUEST' });
    const { data } = await api.getPostById(id);
    dispatch({ type: 'FETCH_POST_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FETCH_POST_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};
export const getPostsByHandleAction = (handle: string) => async (dispatch: AppDispatch) => {

  try {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });
    const { data } = await api.getPostsByHandle(handle);
    dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FETCH_POSTS_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};
export const votePostAction = (postId: string, voteData: any, token: string) => 
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "VOTE_POST_REQUEST" });

      const { data } = await api.votePost(postId, voteData, token);

      dispatch({ type: "VOTE_POST_SUCCESS", payload: data });

      return data;
    } catch (error: any) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch({ type: "VOTE_POST_FAIL", payload: errMsg });
      throw new Error(errMsg);
    }
};


// Vote on Post
export const fetchVotesByPostAction = (postId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_VOTES_REQUEST' });
    const { data } = await api.getVotesByPost(postId);
    dispatch({ type: 'FETCH_VOTES_SUCCESS', payload: data }); // data should be votes[]
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FETCH_VOTES_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};

// Fetch votes by a user (optional)
export const fetchVotesByUserAction = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_VOTES_USER_REQUEST' });
    const { data } = await api.getVotesByUser(userId);
    dispatch({ type: 'FETCH_VOTES_USER_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FETCH_VOTES_USER_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};

// Fetch all votes (admin / analytics)
export const fetchAllVotesAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_ALL_VOTES_REQUEST' });
    const { data } = await api.getAllVotes();
    dispatch({ type: 'FETCH_ALL_VOTES_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'FETCH_ALL_VOTES_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};

// Delete current user's vote on a post
export const deleteVoteAction = (postId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'DELETE_VOTE_REQUEST' });
    const { data } = await api.deleteVote(postId, token); // data = updated post (preferred)
    dispatch({ type: 'DELETE_VOTE_SUCCESS', payload: data });
    return data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch({ type: 'DELETE_VOTE_FAIL', payload: errMsg });
    throw new Error(errMsg);
  }
};