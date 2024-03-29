import React from "react";
import { Link } from "react-router-dom";
import './Start.css'

function Start() {
  return (
    <>    
      <div className="started">
        <div className="container">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="d-flex row">
              <h1 className="logo d-flex justify-content-center">Space chat</h1>
              <div className="d-flex justify-content-center">
              </div>

              <div className="d-flex justify-content-center">
                <Link
                  className="btn btn-light btn-lg mx-4"
                  to="/Register"
                  role="button"
                >
                  Register
                </Link>
                <Link class="btn btn-dark btn-lg" to="/Login" role="button">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Start;