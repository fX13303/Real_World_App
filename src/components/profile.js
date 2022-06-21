import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyArticles from "./myArticles";
import { REALWORLD_API } from "../constant";
import { getUser } from "../api/user";
import { getArticles, getArticlesByAuthor } from "../api/article";
import { getUserByPath } from "../api/profile";
import axios from "axios";

function Profile() {
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState([]);
  const [myArticles, setMyArticles] = useState(null);
  const [user, setUser] = useState({});

  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    setMyArticles([])
    getUserByPath(username).then((res) => {
      setUser(res.data.profile);
      getArticlesByAuthor(res.data.profile.username).then((res) =>
        setMyArticles(res.data.articles)
      );
    });
  }, [username]);
  useEffect(() => {
    getUser().then((res) => {
      setCurrentUser(res.data.user);
    });
  }, []);

  // useEffect(() => {
  //   const path = window.location.pathname.split("@");
  //   getUserByPath(path[1]).then((res) => setUser(res.data.profile));
  //   // console.log(res)
  // }, [currentUser]);
  // // console.log(user?.username)
  // useEffect(() => {
  //   getUser().then((res) => setCurrentUser(res.data.user));
  // }, [currentUser]);

  // useEffect(() => {
  //   if (user.username) {
  //     // console.log("run here", currentUser);
  //     getArticlesByAuthor(user.username).then((res) =>
  //       setMyArticles(res.data.articles)
  //     );
  //   }
  // }, [currentUser]);
  const FollowUser = async () => {
    try {
      const res = await axios.post(
        `${REALWORLD_API}/profiles/${user.username}/follow`,
        { username: user.username },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const UnfollowUser = async () => {
    try {
      const res = await axios(
        {
          method: "DELETE",
          url: `${REALWORLD_API}/profiles/${user.username}/follow`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Token " + token,
          },
          params: {
            user: user.username,
          },
        },

        { username: user.username },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  // // console.log(currentUser)
  // // getUserCurrent()
  // // console.log(`https://api.realworld.io/articles?author=${user.username}`)
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={user.image} className="user-img" />
              <h4>{user.username}</h4>
              <p>{user.bio}</p>
              {currentUser.username == user.username ? (
                <Link to="/setting">
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp; Edit Profile Setting
                  </button>
                </Link>
              ) : user.following == false ? (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={FollowUser}
                >
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {user.username}
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={UnfollowUser}
                >
                  <i className="ion-plus-round"></i>
                  &nbsp; Unfollow {user.username}
                </button>
              )}
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
                  <Link className="nav-link active" to="">
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/@${user.username}/favorited`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
            {myArticles ? (
              myArticles.map((article, index) => (
                <MyArticles key={index} article={article} />
              ))
            ) : (
              <div>
                <br></br>You have not posted any articles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
