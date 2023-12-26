import React, { useState, useEffect, Component } from 'react';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Unidades(){
    const navigate = useNavigate();
    const [nombreUnidad, setNombreUnidad] = useState("");
    const [unidadesNegocio, setUnidadesNegocio] = useState([]);
    const [botonDeshabilitado3, setBotonDeshabilitado3] = useState(true);
    const [editingUnidadId, setEditingUnidadId] = useState(null);
    const handleEdit = async (unidadId, nombreUnidad) => {
            try {
            const response = await axios.patch(`https://localhost:7126/api/Proyecto/UpdateUnidad/${unidadId}`, {
                unidadId,
                nombreUnidad,
            });
        
            console.log(response.data);
            window.location.reload();
            } catch (error) {
            console.error('Error during etapa update:', error);
            }
    };
    const handleEditButtonClick = (event,unidadId) => {
        event.preventDefault();        
        setEditingUnidadId(unidadId);
    };
    const agregarNuevaUnidad = async () => {
            try {
            // Verifica que nombreEtapa no esté vacío antes de hacer la solicitud
            if (nombreUnidad.trim() === '') {
                console.log('El campo de entrada está vacío. No se agregará la unidad.');
                return;
            }
        
            const response = await axios.post('https://localhost:7126/api/Proyecto/AddUnidad', {
                nombreUnidad: nombreUnidad,
                // No incluir 'id' en la solicitud POST
            });
        
            console.log('Respuesta:', response.data);
        
            // Limpia el campo de entrada después de agregar la etapa
            setNombreUnidad('');
        
            // Deshabilita el botón después de agregar la etapa
            setBotonDeshabilitado3(true);
            } catch (error) {
            console.error('Error al agregar etapa', error);
            }
    };
    const handleInputChangeUnidad = (event) => {
    const nuevoValor = event.target.value;
    setNombreUnidad(nuevoValor);

    // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
    setBotonDeshabilitado3(!nuevoValor.trim());
    };
    const handleVolver = () => {
        // Utiliza la función goBack() para retroceder una página en la historia del navegador.
        navigate('/Config');
    };
    const obtenerUnidades = async () => {
        try {
        const response = await axios.get('https://localhost:7126/api/Proyecto/unidades-negocio');
        setUnidadesNegocio(response.data);
        } catch (error) {
        console.error('Error al obtener unidades', error);
        }
        
    };
    useEffect(() => {
        obtenerUnidades();
    }, []);
    return(
        <form action="">
            <button onClick={handleVolver} className='btn btn-success m-2'>
                    Volver
                </button>
                <div className="contenedor form-group">
                    <label>Unidad</label>
                    <input
                    style={{width:'300px', margin:'10px', padding:'5px'}}
                    type="text"
                    class="form-control"
                    id="unidad"
                    value={nombreUnidad}
                    onChange={handleInputChangeUnidad}
                    />
                    <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevaUnidad} disabled={botonDeshabilitado3}>Añadir</button>
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
                            {Array.isArray(unidadesNegocio) &&
                            unidadesNegocio.map((unidad) => (
                                <tr key={unidad.unidadId}>
                                <td>
                                    {editingUnidadId === unidad.unidadId ? (
                                    <input
                                        type="text"
                                        defaultValue={unidad.nombreUnidad}
                                        onBlur={() => setEditingUnidadId(null)}
                                        onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleEdit(unidad.unidadId, e.target.value);
                                            setEditingUnidadId(null);
                                        }
                                        }}
                                    />
                                    ) : (
                                        unidad.nombreUnidad
                                    )}
                                </td>
                                <td>
                                    {editingUnidadId === unidad.unidadId ? (
                                    <button onClick={() => setEditingUnidadId(null)} 
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
                                    <button onClick={(event) => handleEditButtonClick(event, unidad.unidadId)} 
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

export default Unidades