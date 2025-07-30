const initialState = {
  data: [],
  info: null,
  totalQty: 0,
  totalPrice: 0,

};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PRODUCT":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_PRODUCT_INFO":
      return {
        ...state,
        info: action.payload,
      };
      case "SET_TOTAL_PRODUCT":
        return {
          ...state,
          totalQty: action.payload,
        };
        case "SET_TOTAL_PRICE":
        return {
          ...state,
          totalPrice: action.payload,
        };
    default:
      return state;
  }
}
