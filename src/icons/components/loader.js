import React from 'react';
import './loader.css';

function Loader(props) {
    const {
        src,
        alt,
        size
    } = props
    return (
        <div className="Loader">
            <img
                src={src}
                alt={alt}
                width={size}
                height={size}
            />
        </div>
    )
}

export default Loader