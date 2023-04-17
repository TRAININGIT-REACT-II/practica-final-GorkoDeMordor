import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { obtenerNombreUsuario } from "../../Auth";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Cabecera = () => {
 
let navigate = useNavigate();

const cerrarSesion = () => {     
   localStorage.removeItem('usuarioAcceso');    
   let path = `/CerrarSesion`;
   navigate(path);
}

return (
     <div className="container-fluid bg-secondary text-light">
<>
  <div className="row">
    <div className="col-5">
     
    </div>
    <div className="col-5">
    <h1>Training notes</h1>
    </div>
    <div className="col-2 d-inline p-3">
    <div className="d-inline float-end">Usuario:{obtenerNombreUsuario()} <button className="rounded-circle small btn btn-success" onClick={cerrarSesion}>X</button> </div>
    </div>
  </div>

  </> 

</div>
    );


}

export default Cabecera;