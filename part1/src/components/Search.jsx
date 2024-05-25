
import React, { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Perform search logic here
        console.log('Searching for:', searchTerm);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search term"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;