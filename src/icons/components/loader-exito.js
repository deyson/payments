import React from 'react';
import Loader from './loader';
import Icon from '../../images/loader-exito.gif';

function LoaderExito() {
  return (
    <Loader 
        src={Icon}
        alt="Cargando..."
        size={64}
    />
  )
}

export default LoaderExito;