import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
    super(props);
    this.state = { error: false };
    }
    
    static getDerivedStateFromError(error) {
    return { error: error };
    }
    
    componentDidCatch(error, errorInfo) {
    }
    
    render() {
    if (this.state.error) {

       
 
    return (
        <div id="myModal" 
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
                background: "black",
                opacity: 0.8}
        }

>
  <div style = {{
                color: "red",
                backgroundColor: "#fefefe",
                margin: "auto",
                marginTop:"100px",
                padding: "20px",
                border: "1px solid #888",
                width: "50%",    
                height:"100px"     
  }}  
  >

<span><h3>Ha ocurrido un error no controlado.</h3></span>
<span className="float-end"><a className="link-danger" href="/ListaNotas">Volver</a></span>

  </div>

</div>
    )
    
    
    

    }
    
    return this.props.children; 
    }
    }
    
    export default ErrorBoundary;