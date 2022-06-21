import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header";
import NewArticle from "./newArticle";
import GetAnArticle from "./article";
import Home from "./home";
import SignIn from "./login";
import Profile from "./profile";
import SignUp from "./register";
import Setting from "./settings";
import YourHomePage from "./yourHomePage";
import FavoritedPage from './favoritedPage'
import axios from 'axios'
import EditArticle from "./editArticle";

function Main() {
    const [currentUser, setCurrentUser] = useState([]);
    const [user, setUser] = useState([]);

    // console.log(path)
    const token = localStorage.getItem("token")
    const getUserCurrent = async () => {
        try {
            const res = await axios.get('https://api.realworld.io/api/user',{
            headers: {
                "accept": "application/json",
                "Authorization": "Token " + token 
            }
            }).then(res => {
            setCurrentUser(res.data.user)
            console.log(currentUser)
            })
        } 
        
        catch (err) {
        console.log(err)  
        }
    }


    
    useEffect(() => getUserCurrent, [])
    return (
        <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path="/article" element={<NewArticle />} />
            <Route path="/setting" element={<Setting />} />
            <Route path='/@:username' element={<Profile />} />
            <Route path="/yourfeed" element={<YourHomePage />} />
            <Route path= '/:username/favorited' element={<FavoritedPage />} />
            <Route path={`/articles/:slug`} element={<GetAnArticle />} />
            <Route path={`/editor/:slug`} element={<EditArticle />} />
            {/* <Route path={`/@${user.username}`} element={<AnotherProfile />} /> */}
        </Routes>
        </div>
        
    );
}

export default Main;