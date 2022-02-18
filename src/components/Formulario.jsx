
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import Alerta from "./Alerta";

import { monedas } from "../data/Monedas";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DF3;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) =>{

    //Hooks
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    //destructuring de customHooks
    const [moneda, SelectMoneda] = useSelectMonedas('Elige Tu Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige Tu CriptoMoneda', criptos)

    //llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            //armar el array
            const arrayCriptos = resultado.Data.map(cripto => {

                const objetoData = {
                    id: cripto.CoinInfo.Name,
                    nombre:cripto.CoinInfo.FullName
                }
                return objetoData;
            })

            //llenar el state
            setCriptos(arrayCriptos); 
        }

        //llamado a la función
        consultarAPI();
    },[])

    //submit al form
    const handleSubmit = (e) => {
        e.preventDefault();

        if([moneda,criptomoneda].includes('')){
            setError(true);
            return;
        }

        setError(false);
        //llenar state app.jsx
        setMonedas({
            moneda,
            criptomoneda
        })

    }

    return(
        <>
            {error && <Alerta>Todos los campos son obligatorios</Alerta>}
            <form
                onSubmit={handleSubmit}
            >

                < SelectMoneda />
                < SelectCriptomoneda />
                <InputSubmit 
                    type="submit" 
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario;