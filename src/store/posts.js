import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "launches",
  initialState: {
    list: [],
    loading: false,
  },

  reducers: {
    postsRequested: (posts, action) => {
      posts.loading = true;
    },

    postsReceived: (posts, action) => {
      posts.list = action.payload;
      posts.loading = false;
    },

    postsRequestFailed: (posts, action) => {
      posts.loading = false;
    },
  },
});

export default slice.reducer;

const { postsRequested, postsReceived, postsRequestFailed } = slice.actions;

const url = "/launches/query";

export const loadposts = (options) => (dispatch) => {
  console.log("options", options);
  return dispatch(
    apiCallBegan({
      url,
      options: options,
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
    })
  );
};
