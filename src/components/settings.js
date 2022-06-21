import React, {useState} from "react";
import axios from 'axios'
import { useAuth } from "./header";
import {Link} from 'react-router-dom'


function Setting() {
    const {setIsLoggedIn} = useAuth()
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({
        "email":  "" ,
        "token": "",
        "username": "",
        "bio": "",
        "image": ""
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }
    const handleLogOut = (event) => {
        localStorage.clear()
        setIsLoggedIn(false)
    }   
    // console.log(user)
    const handleUpdateUser = async () => {
        try {
            console.log('submit data', user)
            const res = await axios.put('https://api.realworld.io/api/user', 
            {"user": user }, 
            {
                headers: {
                    'Authorization': 'Token ' + token,
                    // 'accept: application/json'
                    'Content-Type': 'application/json'
                }
            })
            localStorage.clear();
            const userAfterUpdate = Object.entries(res.data.user)
            userAfterUpdate.map(property => {
                localStorage.setItem(property[0], property[1])
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    return(
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture" onChange={handleInputChange} name="image" value={user.image}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Your Name" onChange={handleInputChange} name="username"  value={user.username}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control form-control-lg" rows="8"
                                            placeholder="Short bio about you" onChange={handleInputChange} name="bio" value={user.bio}></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={handleInputChange} name="email" value={user.email}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password"  onChange={handleInputChange} name="password" value={user.password}/>
                                </fieldset>
                                <Link to={`/@${user.username}`}>
                                    <div className="btn btn-lg btn-primary pull-xs-right" onClick={handleUpdateUser}>
                                        Update Settings
                                    </div>
                                </Link>
                            </fieldset>
                            <Link to="/">
                                <div className="btn btn-lg btn-danger" onClick={handleLogOut}>
                                    Log Out
                                </div>
                            </Link>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Setting