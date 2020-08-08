import axiosStream from "../apis/axiosStreams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// along with formData our reducer will also have userId of user who created the new stream.
// logged user info is mantained in auth reducer and getState arg with dispatch in returned fn will give all the reducers i.e auth reducers too.
export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const response = await axiosStream.post("/streams", {
      ...formValues,
      userId: getState().auth.userId,
    });
    dispatch({ type: CREATE_STREAM, payload: response.data });
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await axiosStream.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await axiosStream.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, playload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await axiosStream.put(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, playload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
  await axiosStream.delete(`/streams/${id}`); // no need of response, as response data will be empty.
  dispatch({ type: DELETE_STREAM, playload: id });
};
