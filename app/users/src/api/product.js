import {
  productLoadByCatAction,
  // loadBySearchAction,
} from "../action/product";
import axios from "axios";
import url from "../url";

export const productLoadByCat = (dispatch, load) => {
  switch (load.action) {
    case "search":
      console.log("search");
      axios
        .get(
          `${url}/product/category/${load.id}?page=${load.page}&keyword=${load.keyword}`
        )
        .then((res) => {
          dispatch(productLoadByCatAction(res.data));
        })
        .catch((err) => console.log(err));
      break;
    case "price":
      console.log("price");
      axios
        .get(
          `${url}/product/category/${load.id}?page=${load.page}&begin=${load.begin}&end=${load.end}`
        )
        .then((res) => {
          dispatch(productLoadByCatAction(res.data));
        })
        .catch((err) => console.log(err));
      break;
    case "sort":
      console.log("sort");
      axios
        .get(
          `${url}/product/category/${load.id}?page=${load.page}&name=${load.name}&sort=${load.sort}`
        )
        .then((res) => {
          dispatch(productLoadByCatAction(res.data));
        })
        .catch((err) => console.log(err));
      break;
    case "default":
      console.log("default");
      axios
        .get(`${url}/product/category/${load.id}?page=${load.page}`)
        .then((res) => {
          dispatch(productLoadByCatAction(res.data));
        })
        .catch((err) => console.log(err));
      break;
  }
};
