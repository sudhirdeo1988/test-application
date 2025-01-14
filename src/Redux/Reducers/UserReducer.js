const initialState = {
  loading: false,
  error: false,
  data: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get List Item
    case "USER_LIST_REQUEST":
      return { ...state, loading: true };
    case "USER_LIST_SUCCESS":
      return action.payload;

    case "USER_LIST_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
