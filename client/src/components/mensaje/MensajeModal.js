import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";

const elementoMensaje = document.querySelector("#mensaje");

const Mensaje = (props) => {

        const timer = setTimeout(() => {
                props.obtenerMensajeError('');
        }, 10000);

              const cerrarModal = () =>{  
             document.getElementById("myModal").style.display = "none";
             props.obtenerMensajeError('');
              }

        return (props.mensajeError != '' ?
                ReactDOM.createPortal(

<div onClick={cerrarModal}  id="myModal" 
        style={{     
                visibility:"inline",                
                position: "fixed",
                zIndex: 1,
                paddingTop: "100px",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflowX : 'auto',                 
                background: "linear-gradient(#e66465, #9198e5);"}
        }

>
  <div style = {{
                color: "#A93226",
                backgroundColor: "#FCF3CF",
                margin: "auto",
                marginTop:"100px",
                padding: "20px",
                border: "2px solid #888",
                borderRadius: "5px",
                width: "30%"               
  }}  
  >

    <p> {props.mensajeError}</p>
  </div>

</div>, elementoMensaje)
: '');
}
export default Mensaje;