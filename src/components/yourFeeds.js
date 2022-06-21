import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { FavoriteArticle } from "../api/favorite";
import {Link} from 'react-router-dom'
import { REALWORLD_API } from "../constant";

function YourFeeds({article}) {
    // const [updater, setUpdater] = useState(true)
    const token = localStorage.getItem("token")
    const FavoriteArticle = async () => {
        try {
            const res = await axios.post(`${REALWORLD_API}/articles/${article.slug}/favorite`, {slug: article.slug} , {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + token,
                    "accept": "application/json"
                }
            })
            return res
        }
        catch(err) {
            console.log(err)
        }
    }
    const UnFavoriteArticle = async () => {
        try {
            console.log('token', token)
            const res = await axios({
                method: "DELETE",
                url: `${REALWORLD_API}/articles/${article.slug}/favorite`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + token,
                    "accept": "application/json"
                },
                params: {
                    slug: article.slug
                }
            })
            return res
        } catch(err) {
            console.log(err)
        }
    }
    const favorited = article.favorited
    // console.log(article)
    // useEffect(() => setUpdater(false))
    return(
        <div className="article-preview">
            <div className="article-meta">
            <Link to={`/@${article.author.username}`}>
                <img src={article.author.image} />
            </Link>
            <div className="info">
                <Link to={`/@${article.author.username}`} className="author">
                {article.author.username}
                </Link>
                <span className="date">{article.updatedAt}</span>
            </div>
            { !favorited ? <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={FavoriteArticle}>
                <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
            </button> : <button className="btn btn-primary btn-sm pull-xs-right" onClick={UnFavoriteArticle}>
                <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
            </button> }
            </div>
            <Link to={`/articles/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <span>Read more...</span>
            </Link>
        </div>
    )
}

export default YourFeeds