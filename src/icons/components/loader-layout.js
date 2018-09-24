import React from 'react';
import LoaderExito from './loader-exito';
import LoaderCarulla from './loader-carulla';

function LoaderLayout(props) {
    return (
        <div>
            {
                props.skin == "exito" ?
                <LoaderExito />
                :
                <LoaderCarulla />
            }
        </div>
    )
}

export default LoaderLayout;