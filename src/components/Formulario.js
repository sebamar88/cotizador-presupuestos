import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYears, calcularMarca, calcularPlan } from '../helpers'
import PropTypes from 'prop-types'

const Campo = styled.div`
    display:flex;
    margin-bottom:1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display:block;
    width:100%;
    padding:1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const Radio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size:16px;
    width:100%;
    padding:1rem;
    color:#FFF;
    text-transform: uppercase;
    font-weight:bold;
    border:none;
    transition: background-color .3s ease;
    margin-top:2rem;
    &:hover{
        cursor:pointer;
        background-color: #26c6da;  
    }
`;

const Error = styled.div`
    background-color:red;
    padding:1rem;
    color:white;
    border-radius: 5px;
    text-align:center;
    margin-bottom:2rem;
    width:100%;
`;

const Formulario = ({setResumen, setCargando}) => {
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [error, setError] = useState(false)

    const { marca, year, plan } = datos;

    //Cuando el usuario presiona submit
    const handleSubmit = e =>{
        e.preventDefault()

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            setError(true)
            return;
        }

        setError(false)

        //Una base de 2000
        let resultado = 2000;

        // obtener la diferencia de años
        const diferencia = obtenerDiferenciaYears(year);

        
        
        
        

        // por cada año hay q restar el 3%
        resultado -= ((diferencia * 3) * resultado)/100;
        //Americano 15%
        //Asiatico 5%
        //Europeo 30%
        resultado = (resultado * calcularMarca(marca));
        //Basico aumenta 20%
        //Completo aumenta 50%
        const incrementoPlan = calcularPlan(plan)
        resultado = parseFloat(resultado * incrementoPlan).toFixed(2) ;
        // Total

        setCargando(true);

        setTimeout(()=>{
            setCargando(false);
            setResumen({
                cotizacion: Number(resultado),
                datos
            })
        }, 3000)

        
    }

    return ( 
        <>
            <form
            onSubmit={handleSubmit}
            >
                { error ? <Error>Todos los campos son Obligatorios</Error> : null}
                <Campo>
                    <Label>Marca</Label>
                    <Select
                    name="marca"
                    value={marca}
                    onChange={e=>setDatos({...datos, [e.target.name]:e.target.value})}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="asiatico">Asiatico</option>
                        <option value="americano">Americano</option>
                        <option value="europeo">Europeo</option>
                    </Select>
                </Campo>
                <Campo>
                    <Label>Año</Label>
                    <Select
                    name="year"
                    value={year}
                    onChange={e=>setDatos({...datos, [e.target.name]:e.target.value})}    
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                    </Select>
                </Campo>
                <Campo>
                    <Label>Plan</Label>
                    <Radio 
                        type="radio"
                        name="plan"
                        value="basico"
                        checked={plan  === 'basico'}
                        onChange={e=>setDatos({...datos, [e.target.name]:e.target.value})}
                    /> Básico
                    <Radio 
                        type="radio"
                        name="plan"
                        value="completo"
                        checked={plan === 'completo'}
                        onChange={e=>setDatos({...datos, [e.target.name]:e.target.value})}
                    /> Completo                    
                </Campo>
                <Boton type="submit">Cotizar</Boton>
            </form>
        </>
     );
}


Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}
 
export default Formulario;