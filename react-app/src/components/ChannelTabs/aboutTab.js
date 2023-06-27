import React from "react";
import './aboutTab.css';


function AboutTab({ userDetails }) {
    const moment = require('moment');

    return (
        <>
        <div className="channel-about-wrapper">
            <div className="channel-about-description-wrapper">
                <div>Description</div>
                <div>{userDetails.description}</div>
            </div>
            <div className="channel-about-stats-wrapper">
                <div>Stats</div>
                <div>Joined {moment(userDetails.created_at).format('ll')  }</div>
            </div>
            
        </div>
        </>
    );
}

export default AboutTab;
