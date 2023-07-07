import React, { useState, useContext } from 'react';

const ShowPlaylistContext = React.createContext();

export const useShowPlaylistContext = () => useContext(ShowPlaylistContext);

export function ShowPlaylistProvider({ children }) {
    const [currPlaylistId, setCurrPlaylistId] = useState(false);

    const contextValue = {
        currPlaylistId,
        setCurrPlaylistId
    };

    return (
        <>
            <ShowPlaylistContext.Provider value={contextValue}>
                {children}
            </ShowPlaylistContext.Provider>
        </>
    );
}
