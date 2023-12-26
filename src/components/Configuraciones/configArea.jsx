import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Areas() {
    const navigate = useNavigate();
    const [nombreArea, setNombreArea] = useState('');
    const [unidadSeleccionada, setUnidadSeleccionada] = useState('');
    const [unidadesNegocio, setUnidadesNegocio] = useState([]);
    const [unidadesConAreas, setUnidadesConAreas] = useState([]);
    const [botonDeshabilitado4, setBotonDeshabilitado4] = useState(true);
    const [editingAreaId, setEditingAreaId] = useState(null);

    const handleEdit = async (areaId, nombreArea) => {
        try {
            const response = await axios.patch(`https://localhost:7126/api/Proyecto/UpdateArea/${areaId}`, {
                areaId,
                nombreArea
            });
            console.log(response.data);
            //window.location.reload();
        } catch (error) {
            console.error('Error during area update:', error);
        }
    };


    const handleEditButtonClick = (event, areaId) => {
        event.preventDefault();
        setEditingAreaId(areaId);
    };

    const agregarNuevaArea = async () => {
        try {
        // Verifica que nombreArea no esté vacío y se haya seleccionado una unidad
        if (nombreArea.trim() === '' || unidadSeleccionada === '') {
            console.log('El campo de entrada está vacío o no se ha seleccionado una unidad. No se agregará el área.');
            return;
        }

        const response = await axios.post('https://localhost:7126/api/Proyecto/AddArea', {
            nombreArea: nombreArea,
            unidadId: unidadSeleccionada,
        });

        console.log('Respuesta:', response.data);

        // Limpia el campo de entrada después de agregar el área
        setNombreArea('');

        // Deshabilita el botón después de agregar el área
        setBotonDeshabilitado4(true);
        } catch (error) {
        console.error('Error al agregar área', error);
        }
    };

    const handleInputChangeArea = (event) => {
        const nuevoValor = event.target.value;
        setNombreArea(nuevoValor);

        setBotonDeshabilitado4(!nuevoValor.trim());
    };

    const handleSelectChange = (event) => {
        setUnidadSeleccionada(event.target.value);
        setBotonDeshabilitado4(nombreArea.trim() === '' || event.target.value === '');
    };

    const handleVolver = () => {
        // Utiliza la función goBack() para retroceder una página en la historia del navegador.
        navigate('/Config');
    };

    const obtenerAreas = async () => {
        try {
        const response = await axios.get('https://localhost:7126/api/Proyecto/unidades-negocio');
        setUnidadesNegocio(response.data); // Todas las unidades
        const unidadesConAreas = response.data.filter((unidad) => unidad.areas.length > 0);
        setUnidadesConAreas(unidadesConAreas); // Unidades con al menos un área
        } catch (error) {
        console.error('Error al obtener unidades', error);
        }
    };

    useEffect(() => {
        obtenerAreas();
    }, []);
    
    const handleKeyDown = (event, areaId, nuevoValor) => {
        if (event.key === 'Enter') {
            handleEdit(areaId, nuevoValor);
            setEditingAreaId(null);
        }
    };

    return (
        <form action="">
        <button onClick={handleVolver} className="btn btn-success m-2">
            Volver
        </button>
        <div className="contenedor form-group">
            <label>Unidad</label>
            <select
            style={{ width: '300px', margin: '10px', padding: '5px' }}
            className="form-control"
            value={unidadSeleccionada}
            onChange={handleSelectChange}
            >
            <option value="">Selecciona una unidad</option>
            {unidadesNegocio.map((unidad) => (
                <option key={unidad.unidadId} value={unidad.unidadId}>
                {unidad.nombreUnidad}
                </option>
            ))}
            </select>
            <label>Area</label>
            <input
            style={{ width: '300px', margin: '10px', padding: '5px' }}
            type="text"
            className="form-control"
            id="unidad"
            value={nombreArea}
            onChange={handleInputChangeArea}
            />
            <button className="btn btn-success" style={{ width: '100px' }} onClick={agregarNuevaArea} disabled={botonDeshabilitado4}>
            Añadir
            </button>
        </div>
        <div className="m-3">
            <table className="tabla-clientes table mt-3">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(unidadesConAreas) &&
                unidadesConAreas.map((unidad) => (
                    <tr key={unidad.areas[0].areaId}>
                    <td>
                        {editingAreaId === unidad.areas[0].areaId ? (
                        <input
                            type="text"
                            defaultValue={unidad.areas[0].nombreArea}
                            onBlur={() => setEditingAreaId(null)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleEdit(unidad.areas[0].areaId, e.target.value);
                                    setEditingAreaId(null);
                                }
                                }}
                        />
                        ) : (
                        unidad.areas[0].nombreArea
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

export default Areas;
