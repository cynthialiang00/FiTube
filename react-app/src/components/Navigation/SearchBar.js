import React, {useState} from 'react';
import './Search.css';

function SearchBar() {

    const [searchInput, setSearchInput] = useState("");
    console.log(searchInput)
    return (
        <div className='search-bar-wrapper'>
            <div className='search-bar'>
                <input id='search-query'
                        placeholder='Search'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                >

                </input>
                <button id='search-enter'>
                    <i className="fa-solid fa-magnifying-glass" style={{ color: "#f1f1f1", backgroundColor: "transparent", fontSize: "16px"}}></i>
                </button>
            </div>
            <div className='search-results'></div>
        </div>
    )
    
}

export default SearchBar;