import Post from "../models/post";

export const ADD_POST = "ADD_POST";
export const SET_POSTS = "SET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

export const fetchPosts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        //FIREBASE DATABASE INSERT
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedPosts = [];

      for (const key in resData) {
        loadedPosts.push(
          new Post(
            key,
            resData[key].caption,
            resData[key].image,
            resData[key].location,
            resData[key].address,
            resData[key].userId
          )
        );
      }

      dispatch({
        type: SET_POSTS,
        posts: loadedPosts,
        userPosts: loadedPosts.filter((post) => post.userId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addPost = (caption, image, location) => {
  return async (dispatch, getState) => {
    const responseAddress = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=[API_KEY]`
    );

    if (!responseAddress.ok) {
      throw new Error("Something went wrong!");
    }

    const resDataAddress = await responseAddress.json();
    if (!resDataAddress.results) {
      throw new Error("Something went wrong!");
    }

    const address = resDataAddress.results[0].formatted_address;

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      // FIREBASE DATABASE INSERT ${token},
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption,
          image,
          location,
          address,
          userId: userId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_POST,
      postData: {
        id: resData.name,
        caption,
        image,
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
        address,
        userId: userId,
      },
    });
  };
};

export const updatePost = (id, caption) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      //FIREBASE DATABASE INSERT ${id}${token},
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: UPDATE_POST, pid: id, caption });
  };
};

export const deletePost = (postId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      //FIREBASE DATABASE INSERT ${postId}${token},
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_POST, pid: postId });
  };
};
