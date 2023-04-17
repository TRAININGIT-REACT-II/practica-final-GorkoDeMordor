import React from "react";
import { useState, useRef, useEffect } from "react";
import { obtenerTokenUsuario } from "../../Auth";
import { useNavigate, useParams, useHistory  } from "react-router-dom";

const ModificarNota = () => {
  const [nota, setNota] = useState({ title: '', content: '' });
  const formData = useRef();
  let navigate = useNavigate();
  let { id } = useParams();


  const actualizarNota = (e) => {
    e.preventDefault(); 
    const { title, content } = formData.current;
    console.log(`Name : ${title.value}, Email : ${content.value}`);

    fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'api-token': obtenerTokenUsuario()
      },
      body: JSON.stringify({
        title: title.value, content: content.value
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          console.log(response);
        }
      })
      .then((data) => {
        console.log("DATOS: " + data);
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err.message);
      });

    let path = `/ListaNotas`;
    navigate(path);
  }

  useEffect(() => {
    fetch(`/api/notes/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'api-token': obtenerTokenUsuario()
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          console.log(response);
        }
      })
      .then((data) => {    
        setNota(data)
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err.message);
      });

  }, []);


  return (<>
    <div className="container w-50">
      <div className="text-center fs-4">Modificar nota</div>
      <div>
        <form className="bg-secondary" ref={formData} onSubmit={actualizarNota}>
          < div className="form-group p-3">
            <label htmlFor="formGroupExampleInput">Titulo</label>
            <input type="text" className="form-control" name="title" defaultValue={nota.title}/>
          </div>
          <div className="form-group p-3">
            <label htmlFor="formGroupExampleInput2">Contenido</label>
            <input type="text" className="form-control" name="content" defaultValue={nota.content} />
          </div>
          <div className="form-group p-3 d-flex justify-content-end">
            <button type="submit" className="btn btn-outline-dark btn-sm me-2 mx-2">Modificar</button>
            <button type="button" className="btn btn btn-outline-dark btn-sm me-2" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </>)

}

export default ModificarNota;