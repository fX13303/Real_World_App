import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyArticles from "./myArticles";
import { REALWORLD_API } from "../constant";
import { getUser } from "../api/user";
import { getArticles, getArticlesByFavorited } from "../api/article";
import { getUserByPath } from "../api/profile";

function FavoritedPage() {
  const [user, setUser] = useState([]);
  const [myArticles, setMyArticles] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split("@")[1];
    console.log(path.split('/')[0])
      getUserByPath(path.split('/')[0]).then((res) =>
        setUser(res.data.profile))
        // console.log(res)
      }, [])
      // console.log(user?.username)

  useEffect(() => {
    if (user.username) {
      // console.log("run here", currentUser);
      getArticlesByFavorited(user.username).then((res) =>
        setMyArticles(res.data.articles)
      );
    }
  }, [user]);
  // console.log(currentUser)
  // getUserCurrent()
  // console.log(`https://api.realworld.io/articles?author=${currentUser.username}`)
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={user.image}
                className="user-img"
              />
              <h4>{user.username}</h4>
              <p>{user.bio}</p>
              <Link to="/setting">
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Edit Profile Setting
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className="nav-link" to={`/@${user?.username}`}>
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>
            {myArticles ? (
              myArticles.map((article, index) => (
                <MyArticles key={index} article={article} />
              ))
            ) : (
              <div>
                <br></br>You have not liked any articles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritedPage;
