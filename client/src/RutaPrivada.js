import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cabecera from './components/CabeceraPie/Cabecera';
import Pie from './components/CabeceraPie/Pie';
import { existeToken } from './Auth';


const RutaPrivada = () => {   
    return (
        <>
            {
            existeToken() ? 
            (
                <div>
                <div><Cabecera/></div>
                <div><Outlet/></div>
                <div><Pie/></div>
                </div>
            ) : 
            <Navigate to="/Login" />};
        </>
    )

}
export default RutaPrivada;