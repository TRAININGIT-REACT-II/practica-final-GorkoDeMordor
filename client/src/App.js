import { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Status from "./components/Status";
import Login from "./components/acceso/Login";
import Cabecera from "./components/CabeceraPie/Cabecera";
import Pie from "./components/CabeceraPie/Pie";
import Registrarse from "./components/acceso/Registrarse";
import ListaNotas from "./components/nota/ListaNotas";
import CrearNota from "./components/nota/CrearNota";
import EliminarNota from "./components/nota/EliminarNota";
import ModificarNota from "./components/nota/ModificarNota";
import Mensaje from "./components/mensaje/MensajeModal";
import RutaPrivada from "./RutaPrivada";
import { existeToken } from "./Auth";
import ErrorBoundary from "./components/mensaje/ErrorBoundary";

// Componente principal de la aplicación.
const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  const obtenerMensajeError = (mensaje) =>{
    setMensajeError(mensaje)
  }
 
  return (
    <ErrorBoundary>
    <BrowserRouter>
    <Routes>   
    <Route path='/CerrarSesion' element={<Login obtenerMensajeError={obtenerMensajeError}/>} />   
    <Route path="/" element={existeToken() ? <Navigate to="/ListaNotas" /> : (<Login obtenerMensajeError={obtenerMensajeError}/>)} />
    <Route path="/Registrarse" element={existeToken() ? <Navigate to="/ListaNotas" /> : (<Registrarse obtenerMensajeError={obtenerMensajeError}/>)} />
    <Route path="/Login" element={existeToken() ? <Navigate to="/ListaNotas" /> : (<Login obtenerMensajeError={obtenerMensajeError}/>)} />
    <Route element={<RutaPrivada/>}>     
      <Route path="/ListaNotas" element={<ListaNotas/>} />
      <Route path="/CrearNota" element={<CrearNota obtenerMensajeError={obtenerMensajeError}/>} />
      <Route path="/EliminarNota/:id" element={<EliminarNota/>} />
      <Route path="/ModificarNota/:id" element={<ModificarNota/>} />
      <Route path='*' element={<h1>404</h1>} />   
      </Route>     
      </Routes>   
      <Mensaje mensajeError = {mensajeError} obtenerMensajeError={obtenerMensajeError}/>
  </BrowserRouter>
  </ErrorBoundary>
  );
};

export default App;
