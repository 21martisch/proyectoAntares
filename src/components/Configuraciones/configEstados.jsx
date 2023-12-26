import React, { useState, useEffect, Component } from 'react';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Estado(){
    const navigate = useNavigate();
    const [botonDeshabilitado5, setBotonDeshabilitado5] = useState(true);
    const [nombreEstado, setNombreEstado] = useState("");
    const [estados, setEstados] = useState("");
    const [editingEstadoId, setEditingEstadoId] = useState(null);
    const handleEdit = async (estadoId, nombreEstado) => {
        try {
          const response = await axios.patch(`https://localhost:7126/api/Proyecto/UpdateEstado/${estadoId}`, {
            estadoId,
            nombreEstado,
          });
    
          console.log(response.data);
          window.location.reload();
        } catch (error) {
          console.error('Error during etapa update:', error);
        }
    };
    const handleEditButtonClick = (event,estadoId) => {
        event.preventDefault();        
        setEditingEstadoId(estadoId);
    };
    const obtenerEstados = async () => {
        try {
        const response = await axios.get('https://localhost:7126/api/Proyecto/GetEstados');
        setEstados(response.data);
        } catch (error) {
        console.error('Error al obtener etapas', error);
        }
        
    };
    useEffect(() => {
        obtenerEstados();
    }, []);
    const agregarNuevoEstado = async () => {
            try {
            if (nombreEstado.trim() === '') {
                console.log('El campo de entrada está vacío. No se agregará la unidad.');
                return;
            }
        
            const response = await axios.post('https://localhost:7126/api/Proyecto/AddEstado', {
                nombreEstado: nombreEstado,
            });
        
            console.log('Respuesta:', response.data);
        
            setNombreEstado('');
        
            setBotonDeshabilitado5(true);
            } catch (error) {
            console.error('Error al agregar etapa', error);
            }
    };
    const handleInputChangeEstado = (event) => {
        const nuevoValor = event.target.value;
        setNombreEstado(nuevoValor);
    
        setBotonDeshabilitado5(!nuevoValor.trim());
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
                <label>Estado</label>
                <input
                style={{width:'300px', margin:'10px', padding:'5px'}}
                type="text"
                class="form-control"
                id="estado"
                value={nombreEstado}
                onChange={handleInputChangeEstado}
                />
                <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevoEstado} disabled={botonDeshabilitado5}>Añadir</button>
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
                        {Array.isArray(estados) &&
                        estados.map((estado) => (
                            <tr key={estado.estadoId}>
                            <td>
                                {editingEstadoId === estado.estadoId ? (
                                <input
                                    type="text"
                                    defaultValue={estado.nombreEstado}
                                    onBlur={() => setEditingEstadoId(null)}
                                    onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEdit(estado.estadoId, e.target.value);
                                        setEditingEstadoId(null);
                                    }
                                    }}
                                />
                                ) : (
                                estado.nombreEstado
                                )}
                            </td>
                            <td>
                                {editingEstadoId === estado.estadoId ? (
                                <button onClick={() => setEditingEstadoId(null)} 
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
                                <button onClick={(event) => handleEditButtonClick(event, estado.estadoId)} 
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

export default Estado