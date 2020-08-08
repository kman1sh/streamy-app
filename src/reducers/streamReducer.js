import _ from "lodash";

import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

// note that streams are stored in object form here instead of a array. becoz finding and updating a stream on obj is easy (using key) compare to arrays.
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // note that api gives list of streams in form of array. we need convert it into object as our state is of object type. and then combined together then return. taking help of lodash library
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload); //lodash omit fn: first arg objection, 2nd arg key that we want to remove from the object.
    default:
      return state;
  }
};
