import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import UploadVideoModal from './UploadVideo';
import './Navigation.css';

// import ytlogo from './yt_icon_rgb.png';
import ytlogo from './Youtube-cropped.svg';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	return (
		<nav className='nav-container'>
			<div className='nav-logo-container'>
				<button className='drawer-hideshow'>
					<i className="fas fa-bars" style={{ fontSize: "20px", color: "#f1f1f1" }}></i>
				</button>
				<NavLink exact to="/">
					<img id='nav-logo' src={ytlogo} alt="fitube logo" style={{ width: "100px", height: "30px" }}></img>
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
					{/* <button className='nav-create-btn'>
						<i className="fa-solid fa-video" style={{ fontSize: "20px", color: "#f1f1f1" }}></i>
					</button> */}
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