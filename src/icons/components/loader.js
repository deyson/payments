import React from 'react';
import './loader.css';

function Loader(props) {
    const {
        src,
        alt
    } = props
    
    return (
        <div className="Loader">
            <img
                src={src}
                alt={alt}
            />
        </div>
    )
}

export default Loader