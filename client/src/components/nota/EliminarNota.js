import React from "react";
import { useState, useRef  } from "react";
import { obtenerTokenUsuario } from "../../Auth";
import { useNavigate, useParams } from "react-router-dom";



const EliminarNota = () => {
    let navigate = useNavigate();
    let { id } = useParams();

    const eliminaNota = () => {
        fetch(`/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'api-token': obtenerTokenUsuario(),
            }
        })
            .then((data) => {        
                let path = `/ListaNotas`;
                navigate(path);
            })
            .catch((err) => {
                console.log("ERROR");
                console.log(err.message);
            });
    }

    const cancelarEliminar = () => {
        let path = `/ListaNotas`;
        navigate(path);
    }
    return (<>
        <div className="container w-50">
            <div className="alert alert-danger mt-5" role="alert">
                <h4 className="alert-heading">Eliminar nota</h4>
                <p>¿Está seguro que quiere eliminar la nota?</p>
                <hr></hr>
                <div className="d-flex justify-content-center"><button className="btn btn-outline-secondary btn-sm me-2" onClick={eliminaNota}>Aceptar</button>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => navigate(-1)}>Cancelar</button></div>
            </div>
        </div>
    </>)

}
export default EliminarNota;