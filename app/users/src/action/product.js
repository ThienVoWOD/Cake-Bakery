export const PRODUCT_LOAD_BY_CAT = "PRODUCT_LOAD_BY_CAT";
// export const TOTAL_PRODUCT_BY_CAT = "TOTAL_PRODUCT_BY_CAT";
export const LOAD_BY_SEARCH = "LOAD_BY_SEARCH";

export const productLoadByCatAction = (payload) => ({
  type: PRODUCT_LOAD_BY_CAT,
  payload,
});

// export const totalProductByCatAction = (payload) => ({
//   type: TOTAL_PRODUCT_BY_CAT,
//   payload,
// });

export const loadBySearchAction = (payload) => ({
  type: LOAD_BY_SEARCH,
  payload,
});
