import React, { useState, useEffect, Component } from 'react';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';


function Cliente(){
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [show, setShow] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [selectedClientes, setSelectedClientes] = useState({});
    const [botonDeshabilitado2, setBotonDeshabilitado2] = useState(true);
    
    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };

    const toggleClienteCheckbox = async (clienteId) => {
        // Obten el estado actual del cliente (si existe) o inicialízalo a false
        const currentClienteState = selectedClientes[clienteId] || false;
    
        // Actualiza el estado en el objeto de clientes seleccionados
        const newSelectedClientes = {
        ...selectedClientes,
        [clienteId]: !currentClienteState,
        };
        setSelectedClientes(newSelectedClientes);
    
        try {
        // Construye la URL con el estado actualizado del cliente
        const estadoCliente = newSelectedClientes[clienteId] ? 'activar' : 'desactivar';
        await axios.put(`https://localhost:7126/api/Proyecto/${clienteId}/${estadoCliente}`);
        } catch (error) {
        console.error('Error al actualizar el estado del cliente', error);
        }
    };
    


    const agregarNuevoCliente = async () => {
        try {
        const response = await axios.post('https://localhost:7126/api/Proyecto/AgregarCliente', {
            nombre: nombre,
            // No incluir 'id' en la solicitud POST
        });
        setNombre("");
        console.log(response.data);
        obtenerClientes();
        } catch (error) {
        console.error('Error al agregar el nuevo cliente', error);
        }
    };
    const handleInputChangeCliente = (event) => {
        const nuevoValor = event.target.value;
        setNombre(nuevoValor);
    
        // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
        setBotonDeshabilitado2(!nuevoValor.trim());
    };
    
    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = async () => {
        try {
        const response = await axios.get('https://localhost:7126/api/Proyecto/GetCliente');
        // Mapear clientes y configurar el estado inicial de los checkboxes
        const initialSelectedClientes = response.data.reduce(
            (acc, cliente) => ({
            ...acc,
            [cliente.clienteId]: cliente.estado // Asumimos que el estado de cliente está en la propiedad "estado"
            
            }),
            {}
        );
        setClientes(response.data);
        setSelectedClientes(initialSelectedClientes);
        console.log(clientes.clienteId)
        } catch (error) {
        console.error('Error al obtener clientes', error);
        }
        
    };

    const handleVolver = () => {
        // Utiliza la función goBack() para retroceder una página en la historia del navegador.
        navigate('/Config');
    };

    return (
        <div className='m-4'>
            <button onClick={handleVolver} className='btn btn-success m-2'>
                    Volver
                </button>
            <div className='contenedor'>
                <p style={{margin:'5px', padding:'5px'}}> Agregar clientes</p>
            </div>
                <div >
                    <input
                        style={{width:'300px', margin:'10px', padding:'5px'}}
                        type="text"
                        placeholder="Nombre del nuevo cliente"
                        value={nombre}
                        onChange={handleInputChangeCliente}
                    />
                    <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevoCliente} disabled={botonDeshabilitado2}>añadir</button>
                    <table className="tabla-clientes table mt-3">
                        <thead>
                            <tr>
                            <th>Nombre del Cliente</th>
                            <th>Activar/Desactivar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente, index) => (
                            <tr key={cliente.clienteId || index}>
                                <td>{cliente.nombre}</td>
                                <td>
                                    <label>
                                        <input
                                        type="checkbox"
                                        checked={selectedClientes[cliente.clienteId] || false}
                                        onChange={() => toggleClienteCheckbox(cliente.clienteId)}
                                        title={selectedClientes[cliente.clienteId] ? "Cliente activo" : "Cliente inactivo"}
                                        />
                                    </label>
                                </td>
                                
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <ul className="lista-sin-puntos">
                        {clientes.map((cliente, index) => (
                            // Usar el índice como clave si cliente.id es undefined
                            <li key={cliente.clienteId || index}>
                            <label>
                                <input
                                style={{marginRight:'10px'}}
                                type="checkbox"
                                checked={selectedClientes[cliente.clienteId] || false}
                                onChange={() => toggleClienteCheckbox(cliente.clienteId)}
                                />
                                {cliente.nombre}
                            </label>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
        
    );
}
export default Cliente;