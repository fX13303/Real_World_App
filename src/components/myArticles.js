import React from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart} from '@fortawesome/free-solid-svg-icons'

function MyArticles({article}) {
    return(
        // <div>co du lieu roi</div>
        <div className="article-preview">
            <div className="article-meta">
            <Link to="">
                <img src={article.author.image} />
            </Link>
            <div className="info">
                <Link to={`/@${article.author.username}`} className="author">
                {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
            </button>
            </div>
            <Link to={`/articles/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            </Link>
        </div>
    )
}

export default MyArticles