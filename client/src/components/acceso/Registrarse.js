import React from "react";
import { useState, useEffect } from "react";
import {  Routes,  Route,  Link,  Navigate, useNavigate} from 'react-router-dom';



const Registrarse = (props) =>{

const [usuario, setUsuario] = useState('');
const [pass, setPass] = useState('');
const [registrar, setRegistrar] = useState(false);
const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);
let navigate = useNavigate();
const registrarUsuario = (e) =>{
    e.preventDefaut;

    if(usuario === '' || pass === ''){
        enviarMensajeError('Los campos usuario y contraseña son obligatorios');
        return;
    }    
   const usuarioRegistro = {"username":usuario, "password":pass};

   fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(usuarioRegistro),
    headers: {
      'Content-type': 'application/json',
    },
  })
  .then((response) => {
    if(response.ok){     
        return response.json()
    }
    else{
        return null;
    }
 }) 
     .then((data) => {     

        if(data != null){ 
            setUsuarioRegistrado(true);
            localStorage.setItem("usuarioAcceso",JSON.stringify(data));
        }
        else{
            setUsuario('');
            setPass('');
            enviarMensajeError('Ya existe el usuario insertado');
        }  
     })
     .catch((err) => {
        enviarMensajeError('Se ha producido un error registrando el usuario');
        console.log("ERROR");
        console.log(err.message);
     });

}

const enviarMensajeError = (mensaje) =>{
    props.obtenerMensajeError(mensaje); 
}

useEffect(() =>{      
    setUsuarioRegistrado(localStorage.getItem("usuarioAcceso") == null ? false : true);
    });

    return (   
        <>    
        <div className="text-center p-3 fs-2">ACCESO TRAINING NOTES</div>       
<div className="h-100 d-flex align-items-center justify-content-center mt-5">  
    {usuarioRegistrado ? (<Navigate replace to="/ListaNotas" />) : (         
        <div className="border w-25 bg-light">
           <div className="text-primary px-3 font-weight-bold">Inserte el nuevo usuario y contraseña</div> 
            <form>
                <div className="form-group p-3">
                <label htmlFor="usuario">Usuario</label>
                <input id="usuario" type="text" value={usuario} onChange={(e)=>{setUsuario(e.target.value)}} className="form-control" aria-describedby="usuario" placeholder="usuario"/>
        </div>
        <div className="form-group p-3">
            <label htmlFor="contrasenya">Contraseña</label>
            <input id="pass" type="text" value={pass} onChange={(e)=>setPass(e.target.value)} className="form-control" placeholder="Contraseña"/>
        </div>    
        <div className="float-end p-3">
        <button type="button" onClick={registrarUsuario} className="btn btn-primary btn-sm me-2">Aceptar</button>
        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate('/Login')}>Cancelar</button>
        </div>
        </form>   
        </div>)}
</div>
</>

    )
}
export default Registrarse;