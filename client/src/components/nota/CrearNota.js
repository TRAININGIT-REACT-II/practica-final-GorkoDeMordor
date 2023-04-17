import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { obtenerTokenUsuario } from "../../Auth";
import { useNavigate } from "react-router-dom";
import AlertaModal from "../mensaje/alertaModal";

const CrearNota = (props) =>{
    const [nota, setNota] = useState({title:'', content:''});
    const [mostrarAlerta, setMostrarAlerta] = useState({visibilidad: 'hidden', mensaje: '', path: ''})
    const formData = useRef();
    let navigate = useNavigate();
    
    const guardarNota = (e) =>{
        e.preventDefault(); 
        const {title, content} = formData.current;

        if(title.value === '' || content.value === ''){
          enviarMensajeError('Los campos titulo y contenido son obligatorios');
          return;
      }


        console.log(`Name : ${title.value}, Email : ${content.value}`);

        fetch('/api/notes', {     
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'api-token': obtenerTokenUsuario()    
            },   
            body: JSON.stringify({
                title:title.value,content:content.value
            })
          })
             .then((response) => {
                if(response.ok){     
                  setMostrarAlerta({visibilidad: 'visible', mensaje: 'La nota se ha guardado correctamente', path: '/ListaNotas'});
                    return response.json()
                }
                else{
                    console.log(response);
                }
             }) 
             .then((data) => {           
                console.log("DATOS: "+data);
             })    
             .catch((err) => {      
              enviarMensajeError('Se ha producido un error guardando la nota: '+err);  
             });  
    }

    const enviarMensajeError = (mensaje) =>{
      props.obtenerMensajeError(mensaje); 
  }


    const volver = () => {
     navigate(-1);
    }  
    


    return ( <>
    <div className="container w-50">
    <div className="text-center fs-4">Insertar nota</div>
    <div>
    <form className="bg-secondary" ref={formData} onSubmit={guardarNota}>
    < div className="form-group p-3">
    <label htmlFor="formGroupExampleInput">Titulo</label>
    <input type="text" className="form-control" name = "title"/>
    </div>
    <div className="form-group p-3">
    <label htmlFor="formGroupExampleInput2">Contenido</label>
    <input type="text" className="form-control" name = "content"/>
  </div>
  <div className="form-group p-3 d-flex justify-content-end">
  <button type="submit" className="btn btn-outline-dark btn-sm me-2 mx-2">Guardar</button>
  <button type="button" className="btn btn-outline-dark btn-sm me-2" onClick={volver}>Cancelar</button>
  </div>
</form> 
<AlertaModal {...mostrarAlerta}/>
</div>
</div>     
 </>)
    
}

export default CrearNota;