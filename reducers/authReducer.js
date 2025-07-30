const initialState = {
  isAuthenticated: false,
  profile: null,
  extra: {},
};

export default function adminAuth(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_AUTH":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SET_EXTRA":
      return {
        ...state,
        extra: action.payload,
      };
    default:
      return state;
  }
}
