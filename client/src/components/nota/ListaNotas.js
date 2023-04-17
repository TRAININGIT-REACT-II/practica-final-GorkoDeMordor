import React from "react";
import { useState, useEffect } from "react";
import { obtenerTokenUsuario } from "../../Auth";
import { useNavigate } from "react-router-dom";


const ListaNotas = () =>{ 

const [listadoNotas, setListadoNotas] = useState ([]);

let navigate = useNavigate(); 

const crearNota = () =>{ 
  let path = `/CrearNota`; 
  navigate(path);
}

const eliminarNota = (id) =>{
  let path = `/EliminarNota/${id}`; 
  navigate(path);
}

const modificarNota = (id) =>{
  let path = `/ModificarNota/${id}`; 
  navigate(path);
}

useEffect(() =>{      
  fetch('/api/notes', {     
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'api-token': obtenerTokenUsuario()    
    }   
  })
     .then((response) => {
        if(response.ok){     
            return response.json()
        }
        else{
            console.log(response);
        }
     }) 
     .then((data) => {           
        console.log("DATOS_EFFECT: "+data);
        setListadoNotas(data);
     })    
     .catch((err) => {      
        console.log("ERROR");
        console.log(err.message);             
     });
  }, []);

    return ( <>
    <div className="container w-75">
    <div className="text-center fs-2">LISTADO NOTAS 
    <button className = "btn btn-outline-secondary btn-sm me-2 float-end mt-2" onClick={crearNota}>Añadir</button></div>
       
   {listadoNotas.length == 0 ? (<div className="alert alert-warning" role="alert">
        No se ha encontrado ninguna nota
    </div>) : 
        (
          <table className="table table-success table-striped">
          <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Contenido</th>
              <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
              {
                  listadoNotas.map(
                      (nota, index) => 
                      <tr key = {nota.id}>
                           <td> {index + 1} </td>   
                           <td> {nota.title}</td>
                           <td> {nota.content}</td>
                           <td className="text-center">
                           <button className = "btn btn-outline-secondary btn-sm me-2" onClick={() => modificarNota(nota.id)}>Modificar</button>
                           <button className = "btn btn-outline-secondary btn-sm me-2" onClick={() => eliminarNota(nota.id)}>Eliminar</button>
              </td>
                      </tr>
                  )
              }
          </tbody>
      </table>
        )}
</div>     
 </>)
    
}

export default ListaNotas;