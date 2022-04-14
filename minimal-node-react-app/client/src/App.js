import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Start from "./Start";
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home";
import NotFound from "./components/NotFound.js";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState()

  const setUserData = (user) => {
    setUser(user)
    setIsAuthenticated(true)
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login setUserData={setUserData}/>} />
        <Route exact path="/Home" element={<Home user={user} isAuthenticated={isAuthenticated} />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
