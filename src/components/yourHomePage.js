import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Tags from "./tag";
import YourFeeds from "./yourFeeds";

// const [globalFeeds, setGlobalFeeds] = useState(null);


const token = localStorage.getItem("token")
function YourHomePage() {
    const [yourFeeds, setYourFeeds] = useState(null)
    const [tags, setTags] = useState(null);

    const getCurrentArticle = async () => {
        try {
            const res =  await axios.get('https://api.realworld.io/api/articles/feed', {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Token " + token
                }
            })
            .then(res => {
                console.log(res)
                setYourFeeds(res.data.articles)
            })
        } 
        catch (err) {
            console.log(err)
        }
    }
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
    useEffect(() => getCurrentArticle, [])
    useEffect(() => getTags, [])
    console.log(yourFeeds)
    return (
        <div className="home-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className="nav-link active" to="/yourfeed">
                    Your Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disable" to="/">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            {yourFeeds ? (
              yourFeeds.map((article, index) => (
                <YourFeeds key={index} article={article} />
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
  ) 
}

export default YourHomePage