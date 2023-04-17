import React from "react";
import { useState, useRef  } from "react";
import { obtenerTokenUsuario } from "../../Auth";
import { useNavigate, useParams } from "react-router-dom";

const AlertaModal = ({visibilidad, mensaje, path}) => {
  let navigate = useNavigate();
    const redirigir = () => {  
      console.log('PATH: '+path)     
        navigate(`${path}`);
     }

    return (<>
    <div id="example" style={{ visibility: `${visibilidad}`}}>
      <div className="p-5">
        <p><h2>{mensaje}</h2></p>           
        <button className="btn btn-outline-secondary btn-sm me-2 float-end" onClick={redirigir}>Aceptar</button>
        </div>   
      </div>
    </>)

}
export default AlertaModal;