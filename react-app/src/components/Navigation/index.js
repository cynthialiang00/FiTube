import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import UploadVideoModal from './UploadVideo';
import './Navigation.css';

// import ytlogo from './yt_icon_rgb.png';
import ytlogo from './fitubelogo.svg';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	return (
		<nav className='nav-container'>
			<div className='nav-logo-container'>
				<NavLink exact to="/videos">
					<img id='nav-logo' src={ytlogo} alt="fitube logo" style={{ width: "100px", height: "30px", marginBottom: "7px" }}></img>
				</NavLink>
			</div>
			<div className='nav-search'>
			</div>
			<ul className='nav-utils'>
				<li>
					<OpenModalButton 
						buttonText={<><i className="fa-solid fa-video" style={{ fontSize: "15px", color: "#f1f1f1" }}>{` Upload`}</i></>}
						modalComponent={<UploadVideoModal />}
						className={'nav-create-btn'}
					/>
				</li>
				<li>
					<ProfileButton user={sessionUser} />
				</li>

			</ul>
		</nav>
		// <ul>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 			<ProfileButton user={sessionUser} />
		// 		</li>
		// 	)}
		// </ul>
	);
}

export default Navigation;