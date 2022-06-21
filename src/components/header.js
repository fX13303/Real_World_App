import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../App";
import "../App.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare , faGear } from "@fortawesome/free-solid-svg-icons";
import { faFaceAngry } from "@fortawesome/free-regular-svg-icons";

// async function SetUserLogin() {
//   const currentUser = [];
//   for (let i = 0; i < localStorage.length; i ++) {
//     currentUser.push(localStorage.getItem(localStorage.key(i)))
//   }
//   console.log(currentUser)
//   const isLogin = localStorage.getItem('token');
//   return isLogin
// }


export const useAuth = () => {
  const context = useContext(AuthContext)
  const {isLoggedIn, setIsLoggedIn} = context


  return {
    isLoggedIn,
    setIsLoggedIn,
  };
};
function Header() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const getUserCurrent = async () => {
    try {
        const res = await axios.get('https://api.realworld.io/api/user',{
          headers: {
            "accept": "application/json",
            "Authorization": "Token " + token 
          }
        }).then(res => {
          setUser(res.data.user)
        })
      } 
    
    catch (err) {
      console.log(err)  
    }
  }

  useEffect(() => getUserCurrent, []);

  // await const isLogin =
  const {isLoggedIn} = useAuth()
  // console.log(isLogin)
  return !isLoggedIn ? (
    <div className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/login">
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/register">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/article">
            <FontAwesomeIcon icon={faPenToSquare} /> New Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/setting">
            <FontAwesomeIcon icon={faGear} /> Setting
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to={`/@${user?.username}`}>
              <img src="https://thumbs.gfycat.com/MadFatherlyLhasaapso-max-1mb.gif" className="user-pic"/> {user?.username}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
