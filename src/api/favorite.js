import axios from "axios";
import { REALWORLD_API } from "../constant";

const token = localStorage.getItem("token");
export const FavoriteArticle = async (path) => {
  return await axios
    .post(`${REALWORLD_API}${path}/favorite`, {
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      },
    })
    .catch((err) => console.log(err));
};

export const UnFavoriteArticle = async (path) => {
    return await axios.delete(`${REALWORLD_API}${path}/favorite`, {
        headers: {
            "Authorization": "Token " + token,
            "Content-Type": "application/json"
        }
    })
    .catch((err) => console.log(err))
}