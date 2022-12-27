import React, { useRef, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Login() {
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);
  const navigate = new useNavigate();
  const cookies = new Cookies();

  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
  const handleLogin = async (event) => {
    if (event) event.preventDefault();
    const username = inputUsername.current.value;
    const password = inputPassword.current.value;

    await axios.get("http://127.0.0.1:8005/sanctum/csrf-cookie");

    axios
      .post(
        "http://127.0.0.1:8005/api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.dir(`Bearer ${cookies.get("Authorization")}`);
        cookies.set("Authorization", response.data.token);
        axios
          .get("http://127.0.0.1:8005/api/auth/user", {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          })
          .then((response) => {
            
            setAuthenticatedUser(response.data.user);
            console.log(setAuthenticatedUser);
            // setAuthenticatedUser(response.data.user);
          });
        // navigate("/login");
      });
  };

  return (
    <div className="container col-md-4 mt-5">
      <h1>Login</h1>
      <form action="">
        <div className="form-floating mb-3">
          <input ref={inputUsername} type="text" className="form-control" id="username" placeholder="name@example.com" />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating">
          <input ref={inputPassword} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="mt-4 col-sm-12 btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p className="p-2">
          Sudah punya akun ?
          <Link to="/Register" className="text-decoration-none">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
