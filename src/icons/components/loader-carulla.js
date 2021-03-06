import React from 'react';
import Loader from './loader';
import Icon from '../../images/loader-carulla.gif';

function LoaderCarulla() {
  return (
    <Loader 
        src={Icon}
        alt="Cargando..."
    />
  )
}

export default LoaderCarulla;