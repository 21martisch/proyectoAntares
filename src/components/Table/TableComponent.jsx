import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AiOutlineEllipsis } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from 'moment';
import '../../App.css'
import ProyectoCRUD from '../../Pages/ProyectoCRUD';

const TableComponent = ({ proyectos, editProyecto, Delete, filtro }) => {
    const proyectosFiltrados = proyectos.filter((proyecto) => {
        const matchPrioridad = !filtro.prioridad || proyecto.prioridad.toLowerCase() === filtro.prioridad.toLowerCase();
        const matchCliente = !filtro.cliente || proyecto.cliente.toLowerCase().includes(filtro.cliente.toLowerCase());
        const matchProyecto = !filtro.proyecto || proyecto.nombreProyecto.toLowerCase().includes(filtro.proyecto.toLowerCase());
    
        return matchPrioridad && matchCliente && matchProyecto;
    });

    const closeDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove('show');
        });
    };
    
    const handleDropdownToggle = (index) => {
    closeDropdowns();
    const dropdown = document.getElementById(`dropdown-${index}`);
    dropdown.classList.toggle('show');
    };

    const handleClickOutside = (event) => {
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        }
    });
    };

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);
    return (
        <div className='mi-contenedor p-3 m-2' >
            
            <table className="table custom-table  table-rounded table-striped nowrap" align="center" >
                <thead>
                    <tr>
                        
                        <th scope="col">Codigo</th>
                        <th scope="col">Proyecto</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Inicio</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Etapa</th>
                        <th scope="col">Lider</th>
                        <th scope="col">Categorias</th>
                        <th scope="col">Comentarios</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {Array.isArray(proyectosFiltrados) && proyectosFiltrados.length > 0 && proyectosFiltrados.map((proyecto, index)  => (
                    <tbody key={proyecto.id}>
                        <tr>
                            <td>{proyecto.codigo}</td>
                            <td>{proyecto.nombreProyecto}</td>
                            <td>{proyecto.cliente || 'Sin Cliente'}</td>
                            <td>{proyecto.prioridad}</td>
                            <td>{proyecto.estado}</td>
                            <td>{moment(proyecto.diaInicio).format('DD-MM-YYYY')}</td>
                            <td>{moment(proyecto.diaFin).format('DD-MM-YYYY')}</td>
                            <td>{proyecto.etapa}</td>
                            <td>{proyecto.liderProyecto}</td>
                            <td>{proyecto.categorias || 'Sin Unidad'}</td>
                            <td>{proyecto.comentarios}</td>
                            <td>
                                <div >
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleDropdownToggle(index)}
                                        >
                                            <AiOutlineEllipsis />
                                    </button>
                                    
                                    <ul
                                    id={`dropdown-${index}`}
                                    className="dropdown-menu m-2"
                                    >
                                        <li>
                                            <button
                                            type="button"
                                            className="btn"
                                            onClick={() => {
                                                editProyecto(proyecto);
                                                handleDropdownToggle(index);
                                            }}
                                            >
                                            <MdEdit /> Editar
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                            type="button"
                                            className="btn "
                                            onClick={() => {
                                                Delete(proyecto.id);
                                                handleDropdownToggle(index);
                                            }}
                                            >
                                            <MdDelete /> Eliminar
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
};

export default TableComponent;

