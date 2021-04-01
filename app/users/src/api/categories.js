import axios from "axios";
import url from "../url";
import { loadAction } from "../action/categories";

export const loadCategories = (dispatch) => {
  axios
    .get(`${url}/categories`)
    .then((res) => {
      dispatch(loadAction(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
