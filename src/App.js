import React, { useState } from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Resumen from './components/Resumen';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width:600px;
  margin: 0 auto;
`;
const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding:3rem;
`

function App() {

  const [ resumen, setResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  const [ cargando, setCargando ] = useState(false);

  //Extraer datos
  const { cotizacion, datos } = resumen;



  return (
    <Contenedor>
      <Header 
      titulo="Cotizador de Seguros"
      />
      <ContenedorFormulario>
        <Formulario
          setResumen={setResumen}
          setCargando={setCargando}
        />

        {cargando ? <Spinner /> : null}
        { !cargando ?
        <Resumen 
        datos={datos}
        />
        : null}
       
        { !cargando ?
        <Resultado
        cotizacion={cotizacion}
        />
        : null}
        
      </ContenedorFormulario>
    </Contenedor>
  );
}



export default App;
