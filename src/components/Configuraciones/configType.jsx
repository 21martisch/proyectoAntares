import React, { useState, useEffect, Component } from 'react';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Type(){
    const navigate = useNavigate();
    const [botonDeshabilitado6, setBotonDeshabilitado6] = useState(true);
    const [nombreType, setNombreType] = useState("");
    const [codigo, setCodigo] = useState("");
    const [editingCodigoId, setEditingCodigoId] = useState(null);
    const handleEdit = async (typeId, nombre) => {
        try {
          const response = await axios.patch(`https://localhost:7126/api/Proyecto/UpdateTipo/${typeId}`, {
            typeId,
            nombre,
          });
    
          console.log(response.data);
          window.location.reload();
        } catch (error) {
          console.error('Error during etapa update:', error);
        }
    };
    const handleEditButtonClick = (event,typeId) => {
        event.preventDefault();        
        setEditingCodigoId(typeId);
    };
    const obtenerTipos = async () => {
        try {
            const response = await axios.get('https://localhost:7126/api/Proyecto/GetType');
            setCodigo(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error al obtener tipos:', error);
        }
    };
    useEffect(() => {
        obtenerTipos();
    }, []);
    const agregarNuevoType = async () => {
            try {
            if (nombreType.trim() === '') {
                console.log('El campo de entrada está vacío. No se agregará la unidad.');
                return;
            }
        
            const response = await axios.post('https://localhost:7126/api/Proyecto/AddType', {
                nombre: nombreType,
                // No incluir 'id' en la solicitud POST
            });
        
            console.log('Respuesta:', response.data);
        
            setNombreType('');
        
            setBotonDeshabilitado6(true);
            } catch (error) {
            console.error('Error al agregar etapa', error);
            }
    };
    const handleInputChangeType = (event) => {
        const nuevoValor = event.target.value;
        setNombreType(nuevoValor);
    
        // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
        setBotonDeshabilitado6(!nuevoValor.trim());
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
                <label>Tipo de proyecto</label>
                <input
                style={{width:'300px', margin:'10px', padding:'5px'}}
                type="text"
                class="form-control"
                id="projectType"
                value={nombreType}
                onChange={handleInputChangeType}
                />
                <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevoType} disabled={botonDeshabilitado6}>Añadir</button>
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
                        {Array.isArray(codigo) &&
                        codigo.map((codigo) => (
                            <tr key={codigo.typeId}>
                            <td>
                                {editingCodigoId === codigo.typeId ? (
                                <input
                                    type="text"
                                    defaultValue={codigo.nombre}
                                    onBlur={() => setEditingCodigoId(null)}
                                    onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEdit(codigo.typeId, e.target.value);
                                        setEditingCodigoId(null);
                                    }
                                    }}
                                />
                                ) : (
                                codigo.nombre
                                )}
                            </td>
                            <td>
                                {editingCodigoId === codigo.typeId ? (
                                <button onClick={() => setEditingCodigoId(null)} 
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
                                <button onClick={(event) => handleEditButtonClick(event, codigo.typeId)} 
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

export default Type