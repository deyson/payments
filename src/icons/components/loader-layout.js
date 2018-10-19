import React from 'react';
import LoaderExito from './loader-exito';
import LoaderCarulla from './loader-carulla';
import './loader-layout.css'

function LoaderLayout(props) {
    return (
        <div className="LoaderLayout">
            <div className="LoaderLayout-container">
                {
                    props.skin == "exito" ?
                    <LoaderExito />
                    :
                    <LoaderCarulla />
                }
            </div>
        </div>
    )
}

export default LoaderLayout;