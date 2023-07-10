
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkGetPlaylists } from "../../../store/playlist";
import { useEffect, useState } from "react";
import './ListPlaylistModal.css';
import { thunkAddVideoToPlaylist } from "../../../store/playlist";

const ListPlaylistModal = ({videoId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const playlistList = useSelector((state) => state.playlist.user_playlists);

    useEffect(() => {
        dispatch(thunkGetPlaylists());
    }, [dispatch]);

    
    const handleAddtoPlaylist = async (e, playlistId) => {
       
        if (e.target.checked) {
            console.log('adding to playlist..playlist id: ', playlistId);
            dispatch(thunkAddVideoToPlaylist(playlistId, videoId))
                .then((res) => (res))
                .then((res) => {
                    if (res.errors) {
                        return alert(`${res.errors[0]}`);
                    }
                    else {
                        return alert('Success! Video added to playlist');
                    }
                })
            return;
        }

        else {
            console.log("unchecking..");
            return;
        }
        
    };

    const playlistListArr = Object.values(playlistList);

    return (
        <div className='list-playlists-modal'>

            <div className='list-playlists-modal-header'>
                <div>Save video to...</div>
                <button className="delete-modal-close-btn" onClick={() => closeModal()}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
                
                { playlistListArr.length > 0 ?
                    <>
                        <div className="list-playlists-modal-body">
                            { playlistListArr.map((playlist) => (
                                <div key={playlist.id} className="list-playlists-modal-body-div"
                                >
                                    <input type="checkbox" 
                                        id={`playlist-${playlist.id}-check`}
                                        name={`playlist-${playlist.id}-check`}
                                        onChange={(e) => handleAddtoPlaylist(e, playlist.id)}
                                    ></input>
                                    <label htmlFor={`playlist-${playlist.id}-check`}
                                            className="list-playlists-modal-labels"
                                    >
                                        {playlist.name}
                                    </label>
                                </div>
                            )) }
                        </div>
                        <div className="list-playlists-modal-btns">
                            
                        </div>
                    </>
                  :
                <div className="list-playlists-modal-body">
                  No playlists
                  </div>
                }
            


        </div>
    )

};

export default ListPlaylistModal;
