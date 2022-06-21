import axios from "axios";
import React, { useState } from "react";
import {Link} from 'react-router-dom'

function SignUp() {
    const [user, setUser] = useState({
        "username": "",
        "email": "",
        "password": ""
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target
        console.log(name)
        setUser({
            ...user, 
            [name]: value
        })
    }
    const handleRegister = async () => {
        // const res = await fetch('https://api.realworld.io/api/users', {
        //     method: 'POST',
        //     body: JSON.stringify({ user })
        //     ,headers: {
        //         // 'accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const body = await res.json()
        // console.log(body)
        
       try {
        const res = await axios.post('https://api.realworld.io/api/users', 
        {"user": user}, 
        {
            headers: {
                // 'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        )
        .then(res => console.log('success --->', res))
        console.log('success2 -->', res)
       }
       catch (err) {
            const errors = Object.entries(err.response.data.errors)
            errors.map(error => {
                alert(error[0] + " " + error[1])
            })
       }
    }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text" value={user.username} onChange={handleInputChange}
                  placeholder="Your Name" name="username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Email" name="email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password" value={user.password} onChange={handleInputChange}
                  placeholder="Password" name="password"
                />
              </fieldset>
              <div className="btn btn-lg btn-primary pull-xs-right" onClick={handleRegister}>
                Sign up
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
