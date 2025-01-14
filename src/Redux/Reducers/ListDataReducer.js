import { listData } from "../../Utilities/listData";

const initialState = {
  loading: false,
  error: false,
  data: listData,
};

const listDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get List Item
    case "LIST_REQUEST":
      return { ...state, loading: true };
    case "LIST_SUCCESS":
      return {
        listData: action.payload,
      };
    case "LIST_FAILURE":
      return { ...state, loading: false, error: action.payload };

    // List Item Update
    case "LIST_ITEM_UPDATE_REQUEST":
      return { ...state, loading: true };
    case "LIST_ITEM_UPDATE_SUCCESS":
      return action.payload;

    case "LIST_ITEM_UPDATE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    // List Item Delete
    case "LIST_ITEM_DELETE_REQUEST":
      return { ...state, loading: true };
    case "LIST_ITEM_DELETE_SUCCESS":
      return {
        listData: action.payload,
      };
    case "LIST_ITEM_DELETE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default listDataReducer;
