import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "launches",
  initialState: {
    list: [],
    loading: false,
  },

  reducers: {
    launchesRequested: (launches, action) => {
      launches.loading = true;
    },

    launchesReceived: (launches, action) => {
      launches.list = action.payload;
      launches.loading = false;
    },

    launchesRequestFailed: (launches, action) => {
      launches.loading = false;
    },
  },
});

export default slice.reducer;

const { launchesRequested, launchesReceived, launchesRequestFailed } =
  slice.actions;

const url = "/launches/query";

export const loadlaunches = (options) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      options: options,
      onStart: launchesRequested.type,
      onSuccess: launchesReceived.type,
      onError: launchesRequestFailed.type,
    })
  );
};
