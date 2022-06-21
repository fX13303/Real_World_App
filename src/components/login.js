import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./header";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setIsLoggedIn } = useAuth();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = async () => {
    try {
      const res = await axios
        .post(
          "https://api.realworld.io/api/users/login",
          { user: user },
          {
            headers: {
              // 'accept': 'application/json',
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          const user = Object.entries(res.data.user);
          setIsLoggedIn(true);
          user.map((property) => {
            localStorage.setItem(property[0], property[1]);
          });
        });
    } catch (err) {
      console.log("anfasn");
    }
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  value={user.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  value={user.password}
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <Link to="/">
                <div
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={handleLogin}
                >
                  Sign in
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
