import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, NavLink  } from 'react-router-dom';

const Login = (props) =>{

const [usuario, setUsuario] = useState('');
const [pass, setPass] = useState('');
const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);

const loginUsuario = (e) =>{
    e.preventDefaut;

    if(usuario === '' || pass === ''){
        enviarMensajeError('Los campos usuario y contraseña son obligatorios');
        return;
    }

   const usuarioLogin = {"username":usuario, "password":pass};
    console.log();
    fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(usuarioLogin),
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
        setUsuarioEncontrado(true);
        console.log("DATOS");
        localStorage.setItem("usuarioAcceso",JSON.stringify(data));   
        console.log("USUARIO ENCONTRADO EN EL LOGIN DATOS: "+localStorage.getItem("usuarioAcceso"));  
       
        } 
        else{
            setUsuario('');
            setPass('');
            enviarMensajeError('No se ha encontrado el usuario');
        }
     })    
     .catch((err) => {      
        console.log("ERROR");
        console.log(err.message);
         
     });
}

const enviarMensajeError = (mensaje) =>{
    props.obtenerMensajeError(mensaje); 
}

useEffect(() =>{ 
        setUsuarioEncontrado(localStorage.getItem("usuarioAcceso") == null ? false : true);
});

    return (  
    <>    
    <div className="text-center p-3 fs-2">ACCESO TRAINING NOTES</div>     
    <div className="h-100 d-flex align-items-center justify-content-center mt-5"> 
        {usuarioEncontrado ? (<Navigate replace to="/ListaNotas" />) : (

        <div className="border rounded w-25 bg-light">
            <form> 
                <div className="form-group p-3">
                <label htmlFor="usuario">Usuario</label>
                <input id="usuario" type="text" value={usuario} onChange={(e)=>{setUsuario(e.target.value)}} className="form-control" aria-describedby="usuario" placeholder="usuario"/>
        </div>
        <div className="form-group p-3">
            <label htmlFor="contrasenya">Contraseña</label>
            <input id="pass" type="text" value={pass} onChange={(e)=>setPass(e.target.value)} className="form-control" placeholder="Contraseña"/>
        </div>
        <div className="float-start p-3">
        <NavLink  
        to="/Registrarse">
	Registrarse
</NavLink>
        </div>
        <div className="float-end p-3">
        <button type="button" onClick={loginUsuario} className="btn btn-primary btn-sm">Aceptar</button>
        </div>       
        </form>   
</div>
)}
</div>
</> 


    )
}

export default Login;