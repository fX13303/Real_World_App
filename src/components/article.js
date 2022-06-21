import React, { useEffect, useState } from "react";
import Tags from "./tag";
import { Link , useNavigate} from "react-router-dom";
import { getUser } from "../api/user";
import { getAnArticle } from "../api/article";
import axios from "axios";
import { REALWORLD_API } from "../constant";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function GetAnArticle() {
  const [currentUser, setCurrentUser] = useState([]);
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState({
    body: "",
  });
  const [comments, setComments] = useState(null);
  const path = window.location.pathname;
  const token = localStorage.getItem("token");
  const deleteAnArticle = async () => {
    return await axios
      .delete(`${REALWORLD_API}${path}`, {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      })
      .catch((e) => console.log(e));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const handlePostComment = async () => {
    try {
      const post = await axios
        .post(
          `${REALWORLD_API}${path}/comments`,
          { comment: comment },
          {
            headers: {
              Authorization: "Token " + token,
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setComment({body: ''})
          getComments();
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getComments = async () => {
    try {
      const get = await axios
        .get(`${REALWORLD_API}${path}/comments`, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Token "+ token
          },
        })
        .then((res) => setComments(res.data.comments));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteComment = async (event) => {
    try {
      const id = event.target.closest('.card').id
      // console.log(event.target.closest('.card').id)
      const del = axios.delete(`${REALWORLD_API}${path}/comments/${id}`, {
        headers: {
          "accept": "application/json",
          "Authorization": "Token " + token,
          "Content-Type": "application/json"
        }
      })
      .then(res => getComments());

    }
    catch (err) {
      console.log(err )
    }
  }
  // console.log(path);
  useEffect(() => {
    getUser().then((res) => setCurrentUser(res.data.user));
  }, []);
  useEffect(() => {
    getAnArticle(path).then((res) => setArticle(res.data.article));
  }, []);
  useEffect(() => {
      getComments();
  }, []);
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          <div className="article-meta">
            <Link to={`/@${article?.author.username}`}>
              <img src={article?.author.image}></img>
            </Link>
            <div className="info">
              <Link to={`/@${article?.author.username}`} className="author">
                {article?.author.username}
              </Link>
            </div>
            {currentUser.username == article?.author.username ? (
              <span>
                <Link
                  to={`/editor/${article?.slug}`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Edit Article
                </Link>
                <Link to={`/@${currentUser.username}`}>
                  <div
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteAnArticle}
                  >
                    Delete Article
                  </div>
                </Link>
              </span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <article>{article?.body}</article>
            <ul className="tag-list">
              {article?.tagList.map((tag) => {
                <Tags tag={tag} />;
              })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  onChange={handleInputChange}
                  name="body"
                  value={comment.body}
                  id="textarea"
                ></textarea>
              </div>
              <div className="card-footer">
                <img className="comment-author-img" src={currentUser.image} />
                <Link to={path}>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handlePostComment} 
                >
                  Post Comment
                </button>
              </Link>
              </div>
            </form>
            <div>
              {comments ? comments.map(comment => (
                <div className="card" id={comment.id}>
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/@${comment.author.username}`} className="comment-author">
                    <img
                      className="comment-author-img"
                      alt={comment.author.username}
                      src={
                        comment.author.image ??
                        'https://static.productionready.io/images/smiley-cyrus.jpg'
                      }
                    />
                  </Link>
                  &nbsp;
                  <Link to={`/@${comment.author.username}`} className="comment-author">
                    {comment.author.username}
                  </Link>
                  <time className="date-posted" dateTime={comment.createdAt}>
                    {new Date(comment.createdAt).toDateString()}
                  </time>
                  <Link to={path} >
                  <span className="mod-option"><FontAwesomeIcon icon={faTrash} className="delete-btn" onClick={handleDeleteComment}/></span>
                  </Link>
                </div>
              </div>
              )) : 
                <div>This post does not have any comments</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAnArticle;
