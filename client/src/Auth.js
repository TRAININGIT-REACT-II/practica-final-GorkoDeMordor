export const existeToken = () => {

    if(localStorage.getItem("usuarioAcceso") === null){
        return false;
    }
    else{
        return true;
    }   
}
export const obtenerNombreUsuario = () => {
    if(localStorage.getItem("usuarioAcceso") === null){
    return '';
    }    
    let usuarioAcceso = JSON.parse(localStorage.getItem("usuarioAcceso")); 
    return usuarioAcceso.username;
}
export const obtenerTokenUsuario = () => {
    if(localStorage.getItem("usuarioAcceso") === null){
    return '';
    }    
    let usuarioAcceso = JSON.parse(localStorage.getItem("usuarioAcceso")); 
    return usuarioAcceso.token;

}



