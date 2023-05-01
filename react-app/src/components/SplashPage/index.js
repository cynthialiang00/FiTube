import React from "react";
import { NavLink } from "react-router-dom";
import './Splash.css';

import splashImg from './lofi-splash.jpeg';
import gitImg from './github.svg';
import linkImg from './linkedin.svg';

function SplashPage() {
    return (
        <>
        <div className="splash">
            <h1>Welcome to (lo)FiTube</h1>
            <div className="splash-description">
                <div>
                    FiTube is a place to host music for your relaxing or study needs.
                    Upload your favorite lofi beats, chillhop, nostalgic game OSTs, and
                    many more for others to enjoy!
                </div>
                
                <NavLink to="/videos">
                        <button className="splash-button">Continue to FiTube</button>
                </NavLink>

                <div className="about-links">
                        <a href="https://github.com/cynthialiang00/FiTube.git">
                            <img src={gitImg} alt="github logo"></img>
                        </a>
                        <a href="https://www.linkedin.com/in/cynthia-liang-1ab860243/">
                            <img src={linkImg} alt="linkedin logo"></img>
                        </a>
                </div>
            </div>

        </div>
            <img className="splash-img" src={splashImg} alt="splash background"></img>
        </>
    );
}

export default SplashPage;
