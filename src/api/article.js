import axios from "axios";
import FavoritedPage from "../components/favoritedPage";
import { REALWORLD_API } from "../constant";

const token = localStorage.getItem("token");

export const getArticles = async (params) => {
  return await axios
    .get(`${REALWORLD_API}/articles`, {
      headers: {
        accept: "application/json",
        Authorization: 'Token ' + token,
      },
      params,
    })
    .catch((e) => console.error(e));
};

export const getArticlesByAuthor = async (author) => {
  return await axios
    .get(`${REALWORLD_API}/articles`, {
      headers: {
        accept: "application/json",
        Authorization: 'Token ' + token,
      },
      params: {
        author,
      },
    })
    .catch((e) => console.error(e));
};

export const getArticlesByFavorited = async (favorited) =>  {
  return await axios
    .get(`${REALWORLD_API}/articles`, {
      headers: {
        accept: 'application/json',
        Authorization: "Token " + token
      },
      params: {
        favorited
      }
    })
}

export const getAnArticle = async (path) => {
  return await axios
    .get(`${REALWORLD_API}${path}`, {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token
      }
    })
    .catch((e) => console.log(e))
}

