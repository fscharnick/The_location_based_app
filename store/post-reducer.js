import { ADD_POST, DELETE_POST, SET_POSTS, UPDATE_POST } from "./post-actions";
import Post from "../models/post";

const initialState = {
  posts: [],
  userPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        posts: action.posts,
        userPosts: action.userPosts,
      };
    case ADD_POST:
      const newPost = new Post(
        action.postData.id,
        action.postData.caption,
        action.postData.image,
        action.postData.coords.lat,
        action.postData.coords.lng,
        action.postData.address,
        action.postData.userId
      );
      return {
        ...state,
        posts: state.posts.concat(newPost),
        userPosts: state.userPosts.concat(newPost),
      };
    case UPDATE_POST:
      const userPostIndex = state.userPosts.findIndex(
        (post) => post.id === action.pid
      );
      const updatedPost = new Post(
        action.pid,
        action.caption,
        state.userPosts[userPostIndex].imageUri,
        state.userPosts[userPostIndex].imageUri,
        state.userPosts[userPostIndex].lat,
        state.userPosts[userPostIndex].lng,
        state.userPosts[userPostIndex].address,
        state.userPosts[userPostIndex].userId
      );
      const updatedUserPosts = [...state.userPosts];
      updatedUserPosts[userPostIndex] = updatedPost;

      const allPostIndex = state.posts.findIndex(
        (post) => post.id === action.pid
      );
      const updatedAllPosts = [...state.posts];
      updatedAllPosts[allPostIndex] = updatedPost;
      return {
        ...state,
        posts: updatedAllPosts,
        userPosts: updatedUserPosts,
      };

    case DELETE_POST:
      return {
        ...state,
        userPosts: state.userPosts.filter((post) => post.id !== action.pid),
        posts: state.posts.filter((post) => post.id !== action.pid),
      };
    default:
      return state;
  }
};
