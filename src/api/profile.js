import axios from "axios"
import { REALWORLD_API } from "../constant"

export const getUserByPath = async (path) => {
    const token = localStorage.getItem("token")
    return await axios.get(`${REALWORLD_API}/profiles/${path}`, {
        headers: {
            accept: "application/json",
            "Authorization": "Token " + token
        }
    })
    .catch(err => console.log(err))
}