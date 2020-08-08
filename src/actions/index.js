import axiosStream from "../apis/axiosStreams";
import history from "../history";
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
    /**
     * after the successful network call to POST request and dispatching the action, we will route the user back to all Stream list page i.e homepage Problem
     * with BrowerRouter is that it provide its own history object(keeps track of address bar for url) and very less option to have reference of this history object.
     * when we visit a route path, BrowserRouter passes ref. of history obj to that routerPath component. from where it is very easy to edit history object to route
     * user to different path.As we are not routing from a component but from a action creator, we need to have own "Router" instead of "BrowerRouter" and a own history object
     * to be able access to access history object from anywhere.
     */

    history.push("/"); // redirect to root path after dispatching create Stream action.
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
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await axiosStream.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/"); // redirect to root path after dispatching create Stream action.
};

export const deleteStream = (id) => async (dispatch) => {
  await axiosStream.delete(`/streams/${id}`); // no need of response, as response data will be empty.
  dispatch({ type: DELETE_STREAM, payload: id });
};
