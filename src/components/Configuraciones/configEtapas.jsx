import React, { useState, useEffect, Component } from 'react';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Etapa(){
    const navigate = useNavigate();
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
    const [nombreEtapa, setNombreEtapa] = useState("");
    const [etapas, setEtapas] = useState("");
    const [editingEtapaId, setEditingEtapaId] = useState(null);
    const handleEdit = async (etapasId, nombreEtapa) => {
        try {
          const response = await axios.patch(`https://localhost:7126/api/Proyecto/UpdateEtapa/${etapasId}`, {
            etapasId,
            nombreEtapa,
          });
    
          console.log(response.data);
          window.location.reload();
        } catch (error) {
          console.error('Error during etapa update:', error);
        }
    };
    const handleEditButtonClick = (event,etapasId) => {
        event.preventDefault();        
        setEditingEtapaId(etapasId);
    };
    const obtenerEtapas = async () => {
        try {
        const response = await axios.get('https://localhost:7126/api/Proyecto/GetEtapa');
        setEtapas(response.data);
        } catch (error) {
        console.error('Error al obtener etapas', error);
        }
        
    };
    useEffect(() => {
        obtenerEtapas();
    }, []);
    const agregarNuevaEtapa = async () => {
        try {
            if (nombreEtapa.trim() === '') {
            console.log('El campo de entrada está vacío. No se agregará la etapa.');
            return;
            }
        
            const response = await axios.post('https://localhost:7126/api/Proyecto/AddEtapa', {
            nombreEtapa: nombreEtapa,
            // No incluir 'id' en la solicitud POST
            });
        
            console.log('Respuesta:', response.data);
        
            setNombreEtapa('');
        
            setBotonDeshabilitado(true);
        } catch (error) {
            console.error('Error al agregar etapa', error);
        }
    };
    const handleInputChange = (event) => {
        const nuevoValor = event.target.value;
        setNombreEtapa(nuevoValor);

        setBotonDeshabilitado(!nuevoValor.trim());
    };
    const handleVolver = () => {
        navigate('/Config');
    };
    return(
        <form action="">
            <button onClick={handleVolver} className='btn btn-success m-2'>
                    Volver
                </button>
            <div className="contenedor form-group">
                <label>Etapa</label>
                <input
                style={{width:'300px', margin:'10px', padding:'5px'}}
                type="text"
                class="form-control"
                id="etapa"
                value={nombreEtapa}
                onChange={handleInputChange}
                />
                <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevaEtapa} disabled={botonDeshabilitado}>Añadir</button>
            </div>
            <div className='m-3'>
                <table className="tabla-clientes table mt-3">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(etapas) &&
                        etapas.map((etapa) => (
                            <tr key={etapa.etapaId}>
                            <td>
                                {editingEtapaId === etapa.etapaId ? (
                                <input
                                    type="text"
                                    defaultValue={etapa.nombreEtapa}
                                    onBlur={() => setEditingEtapaId(null)}
                                    onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEdit(etapa.etapasId, e.target.value);
                                        setEditingEtapaId(null);
                                    }
                                    }}
                                />
                                ) : (
                                etapa.nombreEtapa
                                )}
                            </td>
                            <td>
                                {editingEtapaId === etapa.etapaId ? (
                                <button onClick={() => setEditingEtapaId(null)} 
                                style={{
                                    backgroundColor: '#f44336',
                                    color: '#ffffff',
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                >Cancelar</button>
                                ) : (
                                <button onClick={(event) => handleEditButtonClick(event, etapa.etapaId)} 
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: '#ffffff',
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                >Editar</button>
                                )}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
}

export default Etapa