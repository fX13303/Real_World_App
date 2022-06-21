import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Banner from "./banner";
import Tags from "./tag";
import axios from "axios";
import Feeds from "./globalFeeds";
import { AuthContext } from "../App";

let username = "";
const token = localStorage.getItem("token");

const getUserCurrent = async () => {
  try {
    const res = await axios
      .get("https://api.realworld.io/api/user", {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        username = res.data.user.username;
      });
  } catch (err) {
    console.log(err);
  }
};
getUserCurrent();
export const useAuth = () => {
  const context = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = context;

  return {
    isLoggedIn,
    setIsLoggedIn,
  };
};

function Home() {
  const { isLoggedIn } = useAuth();

  const [tags, setTags] = useState(null);
  const [globalFeeds, setGlobalFeeds] = useState(null);
  const getTags = async () => {
    try {
      const res = await axios
        .get("https://api.realworld.io/api/tags", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setTags(res.data.tags);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getGlobalFeeds = async () => {
    try {
      const res = await axios
        .get("https://api.realworld.io/api/articles", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data.articles)
          setGlobalFeeds(res.data.articles);
          // console.log(globalFeeds)
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => getTags, []);
  useEffect(() => getGlobalFeeds, []);
  // console.log(globalFeeds);
  return isLoggedIn ? (
    <div className="home-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className="nav-link disabled" to="/yourfeed">
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            {globalFeeds ? (
              globalFeeds.map((article, index) => (
                <Feeds key={index} article={article}/>
              ))
            ) : (
              <div>Loading ... </div>
            )}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <ul className="tag-list">
                {tags ? (
                  tags.map((tag, index) => <Tags key={index} tag={tag} />)
                ) : (
                  <li>Loading...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            {globalFeeds ? (
              globalFeeds.map((article, index) => (
                <Feeds key={index} article={article} />
              ))
            ) : (
              <div>Loading ... </div>
            )}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <ul className="tag-list">
                {tags ? (
                  tags.map((tag, index) => <Tags key={index} tag={tag} />)
                ) : (
                  <li>Loading...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
