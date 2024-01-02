import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { MdEdit, MdDelete } from 'react-icons/md';
import moment from 'moment';
import { Table, Button, Dropdown } from 'react-bootstrap';
import '../../App.css';
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

    // Pagination
    const itemsPerPage = 10; 
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = proyectosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(Math.ceil(proyectosFiltrados.length / itemsPerPage));

    const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(proyectosFiltrados.length / itemsPerPage)));

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(proyectosFiltrados.length / itemsPerPage);

        if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, index) => (
            <Button key={index} variant="light" onClick={() => paginate(index + 1)}>
            {index + 1}
            </Button>
        ));
        }

        if (currentPage <= 3) {
        return (
            <>
            {Array.from({ length: 3 }, (_, index) => (
                <Button key={index} variant="light" onClick={() => paginate(index + 1)}>
                {index + 1}
                </Button>
            ))}
            <span>...</span>
            <Button variant="light" onClick={() => paginate(totalPages)}>
                {totalPages}
            </Button>
            </>
        );
        }

        if (currentPage > totalPages - 3) {
        return (
            <div>
                <Button variant="light" onClick={() => paginate(1)}>
                    1
                </Button>
                <span>...</span>
                {Array.from({ length: 3 }, (_, index) => (
                    <Button key={index} variant="light" onClick={() => paginate(totalPages - 2 + index)}>
                    {totalPages - 2 + index}
                    </Button>
                ))}
            </div>
        );
        }

        return (
        <div>
            <Button variant="light" onClick={() => paginate(1)}>
            1
            </Button>
            <span>...</span>
            {Array.from({ length: 3 }, (_, index) => (
            <Button key={index} variant="light" onClick={() => paginate(currentPage - 1 + index)}>
                {currentPage - 1 + index}
            </Button>
            ))}
            <span>...</span>
            <Button variant="light" onClick={() => paginate(totalPages)}>
            {totalPages}
            </Button>
        </div>
        );
    };

    return (
        <div className='mi-contenedor p-3 m-2'>
            <div className="table-container">
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Proyecto</th>
                        <th>Cliente</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Etapa</th>
                        <th>Lider</th>
                        <th>Categorias</th>
                        <th>Comentarios</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((proyecto, index) => (
                        <tr key={proyecto.id}>
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
                            <Dropdown>
                            <Dropdown.Toggle variant="secondary" id={`dropdown-${index}`}>
                                <AiOutlineEllipsis />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                onClick={() => {
                                    editProyecto(proyecto);
                                    handleDropdownToggle(index);
                                }}
                                >
                                <MdEdit /> Editar
                                </Dropdown.Item>
                                <Dropdown.Item
                                onClick={() => {
                                    Delete(proyecto.id);
                                    handleDropdownToggle(index);
                                }}
                                >
                                <MdDelete /> Eliminar
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {/* Pagination */}
                <div className="pagination-container">
                    <div className="pagination">
                    <Button variant="light" onClick={goToFirstPage} disabled={currentPage === 1}>
                        &lt;&lt;
                    </Button>
                    <Button variant="light" onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Anterior
                    </Button>
                    {renderPaginationButtons()}
                    <Button variant="light" onClick={goToNextPage} disabled={currentPage === Math.ceil(proyectosFiltrados.length / itemsPerPage)}>
                        Siguiente
                    </Button>
                    <Button variant="light" onClick={goToLastPage} disabled={currentPage === Math.ceil(proyectosFiltrados.length / itemsPerPage)}>
                        &gt;&gt;
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
