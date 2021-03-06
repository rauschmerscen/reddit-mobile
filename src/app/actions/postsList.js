import { apiOptionsFromState } from 'lib/apiOptionsFromState';
import { paramsToPostsListsId } from 'app/models/PostsList';

import PostsEndpoint from 'apiClient/apis/PostsEndpoint';

export const FETCHING_POSTS_LIST = 'FETCHING_POSTS_LIST';
export const fetching = (postsListId, postsParams) => ({
  type: FETCHING_POSTS_LIST,
  postsListId,
  postsParams,
});

export const RECEIVED_POSTS_LIST = 'RECEIVED_POSTS_LIST';
export const received = (postsListId, apiResponse) => ({
  type: RECEIVED_POSTS_LIST,
  postsListId,
  apiResponse,
});

export const FAILED = 'FAILED_POSTS_LIST';
export const failed = (postsListId, error) => ({
  type: FAILED,
  postsListId,
  error,
});

export const fetchPostsFromSubreddit = postsParams => async (dispatch, getState) => {
  const state = getState();
  const postsListId = paramsToPostsListsId(postsParams);
  const postsList = state.postsLists[postsListId];

  if (postsList) { return; }

  dispatch(fetching(postsListId, postsParams));

  try {
    const apiOptions = apiOptionsFromState(state);
    const apiResponse = await PostsEndpoint.get(apiOptions, postsParams);
    dispatch(received(postsListId, apiResponse));
  } catch (e) {
    dispatch(failed(postsListId, e));
  }
};
