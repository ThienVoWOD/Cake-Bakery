import {
  PRODUCT_LOAD_BY_CAT,
  // TOTAL_PRODUCT_BY_CAT,
  LOAD_BY_SEARCH,
} from "../action/product";

const initialState = {
  productsByCat: [],
  totalProductByCat: 0,
  productsBySearch: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOAD_BY_CAT:
      return {
        ...state,
        productsByCat: action.payload,
      };
    // case TOTAL_PRODUCT_BY_CAT:
    //   return {
    //     ...state,
    //     totalProductByCat: action.payload,
    //   };
    case LOAD_BY_SEARCH:
      return {
        ...state,
        productsBySearch: action.payload,
      };
    default:
      return state;
  }
};
