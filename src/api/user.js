import axios from "axios";
import { REALWORLD_API } from "../constant";

const token = localStorage.getItem("token");

export const getUser = async () => {
  return await axios
    .get(`${REALWORLD_API}/user`, {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    })
    .catch((e) => console.error(e));
};
