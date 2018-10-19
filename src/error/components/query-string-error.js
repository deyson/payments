import React from 'react';
import './query-string-error.css';
import logo from '../../images/logo-exito.svg';

function QueryStringError(props) {
  return (
    <div className="QueryStringError">
      <div className="QueryStringError-container">
        <img src={logo} />
      </div>
      <p>No se ha podido cargar el medio de pago.</p>
    </div>
  )
}

export default QueryStringError;