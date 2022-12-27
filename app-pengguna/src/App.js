// import logo from "./logo.svg";
import "./App.css";
import Login from "./login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Register from "./register/Register";
import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

function App() {
  // const [users, setUsers] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  useEffect(
    function () {
      console.dir(authUser);
    },
    [authUser]
  );

  return (
    <UserContext.Provider value={{authUser, setAuthUser}}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
