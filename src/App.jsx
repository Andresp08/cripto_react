
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'

import imagenCripto from './img/imagen-criptos.png'

//styled components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`
const ImagenCripto = styled.img`
  max-width: 400px;
  width: 80%;
  margin:100px auto 0 auto;
  display:block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    display: block;
    background-color: #66A2FE;
    margin: 10px auto 0 auto;
  }
`

const App = ()  => {
  
  //Hooks
  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});

  useEffect(() => {
    if(Object.keys(monedas).length > 0){

      //Destructuring
      const {moneda, criptomoneda} = monedas;

      const cotizarCripto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCotizacion(resultado.DISPLAY[criptomoneda][moneda])
      }
      cotizarCripto();
    }
  },[monedas])

  return (
    <Contenedor>
      <ImagenCripto
        src={imagenCripto}
        alt="Imagen criptmonedas"
      />
      <div>
        <Heading>Cotiza CriptoMonedas al Instante</Heading>
        <Formulario 
          setMonedas={setMonedas}
        />

        {/*Mostrar de forma condicional*/}
        {cotizacion.PRICE && <Cotizacion cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  )
}

export default App
