import React, { useState, useEffect, Component } from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import img from '../components/Configuraciones/fondoCard.jpg'
import Card from '../components/Configuraciones/card';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Config = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [check, setCheck] = useState("");
  const [show, setShow] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [etapas, setEtapas] = useState("");
  const [nombreEtapa, setNombreEtapa] = useState("");
  const [nombreUnidad, setNombreUnidad] = useState("");
  const [nombreArea, setNombreArea] = useState("");
  const [nombreEstado, setNombreEstado] = useState("");
  const [nombreType, setNombreType] = useState("");
  const [selectedClientes, setSelectedClientes] = useState({});
  const [nuevoClienteNombre, setNuevoClienteNombre] = useState("");
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [botonDeshabilitado2, setBotonDeshabilitado2] = useState(true);
  const [botonDeshabilitado3, setBotonDeshabilitado3] = useState(true);
  const [botonDeshabilitado4, setBotonDeshabilitado4] = useState(true);
  const [botonDeshabilitado5, setBotonDeshabilitado5] = useState(true);
  const [botonDeshabilitado6, setBotonDeshabilitado6] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);



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
  const agregarNuevaEtapa = async () => {
    try {
      // Verifica que nombreEtapa no esté vacío antes de hacer la solicitud
      if (nombreEtapa.trim() === '') {
        console.log('El campo de entrada está vacío. No se agregará la etapa.');
        return;
      }
  
      const response = await axios.post('https://localhost:7126/api/Proyecto/AddEtapa', {
        nombreEtapa: nombreEtapa,
        // No incluir 'id' en la solicitud POST
      });
  
      console.log('Respuesta:', response.data);
  
      // Limpia el campo de entrada después de agregar la etapa
      setNombreEtapa('');
  
      // Deshabilita el botón después de agregar la etapa
      setBotonDeshabilitado(true);
    } catch (error) {
      console.error('Error al agregar etapa', error);
    }
  };
  
  const handleInputChange = (event) => {
    const nuevoValor = event.target.value;
    setNombreEtapa(nuevoValor);

    // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
    setBotonDeshabilitado(!nuevoValor.trim());
  };
  const handleInputChangeCliente = (event) => {
    const nuevoValor = event.target.value;
    setNombre(nuevoValor);

    // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
    setBotonDeshabilitado2(!nuevoValor.trim());
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
  const agregarNuevaArea = async () => {
    try {
      // Verifica que nombreEtapa no esté vacío antes de hacer la solicitud
      if (nombreArea.trim() === '') {
        console.log('El campo de entrada está vacío. No se agregará la unidad.');
        return;
      }
  
      const response = await axios.post('https://localhost:7126/api/Proyecto/AddUnidad', {
        nombreArea: nombreArea,
        // No incluir 'id' en la solicitud POST
      });
  
      console.log('Respuesta:', response.data);
  
      // Limpia el campo de entrada después de agregar la etapa
      setNombreArea('');
  
      // Deshabilita el botón después de agregar la etapa
      setBotonDeshabilitado4(true);
    } catch (error) {
      console.error('Error al agregar etapa', error);
    }
  };
  
  const handleInputChangeArea = (event) => {
    const nuevoValor = event.target.value;
    setNombreArea(nuevoValor);

    // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
    setBotonDeshabilitado4(!nuevoValor.trim());
  };
  const agregarNuevoEstado = async () => {
    try {
      // Verifica que nombreEtapa no esté vacío antes de hacer la solicitud
      if (nombreEstado.trim() === '') {
        console.log('El campo de entrada está vacío. No se agregará la unidad.');
        return;
      }
  
      const response = await axios.post('https://localhost:7126/api/Proyecto/AddEstado', {
        nombreEstado: nombreEstado,
        // No incluir 'id' en la solicitud POST
      });
  
      console.log('Respuesta:', response.data);
  
      // Limpia el campo de entrada después de agregar la etapa
      setNombreEstado('');
  
      // Deshabilita el botón después de agregar la etapa
      setBotonDeshabilitado5(true);
    } catch (error) {
      console.error('Error al agregar etapa', error);
    }
  };
  
  const handleInputChangeEstado = (event) => {
    const nuevoValor = event.target.value;
    setNombreEstado(nuevoValor);

    // Habilita el botón si hay algo en el campo de entrada, de lo contrario, deshabilítalo
    setBotonDeshabilitado5(!nuevoValor.trim());
  };

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

  const cardsData = [
    { id: 1, title: 'Configurar Clientes'},
    { id: 2, title: 'Configurar Etapas' },
    { id: 3, title: 'Configurar Unidad' },
    { id: 4, title: 'Configurar Area' },
    { id: 5, title: 'Configurar Estado' },
    { id: 6, title: 'Configurar Tipo Proyecto' },
  ];

  const handleCardClick = () => {
    navigate('/configClientes');
  };
  const handleCardClickEtapa = () => {
    navigate('/configEtapas');
  };
  const handleCardClickUnidad = () => {
    navigate('/configUnidades');
  };
  const handleCardClickArea = () => {
    navigate('/configArea');
  };
  const handleCardClickEstado = () => {
    navigate('/configEstados');
  };
  const handleCardClickType = () => {
    navigate('/configType');
  };

  return (
    <div className='card-container'>
      <div className='card'>
        <img src={img} alt="" />
        <div className='card-content'>
          <h3>Clientes</h3>
          <button className='btn' onClick={handleCardClick}>Configurar</button>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt="" />
        <div className='card-content'>
          <h3>Etapas</h3>
          <button className='btn'onClick={handleCardClickEtapa}>Configurar</button>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt="" />
        <div className='card-content'>
          <h3>Unidades</h3>
          <button className='btn'onClick={handleCardClickUnidad}>Configurar</button>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt="" />
        <div className='card-content'>
          <h3>Areas</h3>
          <button className='btn'onClick={handleCardClickArea}>Configurar</button>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt="" />
        <div className='card-content'>
          <h3>Estados</h3>
          <button className='btn'onClick={handleCardClickEstado}>Configurar</button>
        </div>
      </div>
      <div className='card'>
        <img src={img} alt="" />
        <div className='card-content'>
          <h3>Tipo de Proyecto</h3>
          <button className='btn'onClick={handleCardClickType}>Configurar</button>
        </div>
      </div>
    </div>
    // <div className='m-4'>
    //   <div className='contenedor'>
    //   <label>Cliente</label>
    //     <button style={{width:'100px', margin:'5px', backgroundColor:'grey', color:'white'}} className='btn' onClick={showModal}>Estado</button>
    //   </div>
    //   <form action="">
    //     <div className="contenedor form-group">
    //       <label>Etapa</label>
    //       <input
    //       style={{width:'300px', margin:'10px', padding:'5px'}}
    //       type="text"
    //       class="form-control"
    //       id="etapa"
    //       value={nombreEtapa}
    //       onChange={handleInputChange}
    //       />
    //       <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevaEtapa} disabled={botonDeshabilitado}>Añadir</button>
    //     </div>
    //     <div className="contenedor form-group">
    //       <label>Unidad</label>
    //       <input
    //       style={{width:'300px', margin:'10px', padding:'5px'}}
    //       type="text"
    //       class="form-control"
    //       id="unidad"
    //       value={nombreUnidad}
    //       onChange={handleInputChangeUnidad}
    //       />
    //       <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevaUnidad} disabled={botonDeshabilitado3}>Añadir</button>
    //     </div>
    //     <div className="contenedor form-group">
    //       <label>Area</label>
    //       <input
    //       style={{width:'300px', margin:'10px', padding:'5px'}}
    //       type="text"
    //       class="form-control"
    //       id="area"
    //       value={nombreArea}
    //       onChange={handleInputChangeArea}
    //       />
    //       <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevaArea} disabled={botonDeshabilitado4}>Añadir</button>
    //     </div>
    //     <div className="contenedor form-group">
    //       <label>Estado</label>
    //       <input
    //       style={{width:'300px', margin:'10px', padding:'5px'}}
    //       type="text"
    //       class="form-control"
    //       id="estado"
    //       value={nombreEstado}
    //       onChange={handleInputChangeEstado}
    //       />
    //       <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevoEstado} disabled={botonDeshabilitado5}>Añadir</button>
    //     </div>
    //     <div className="contenedor form-group">
    //       <label>Tipo de proyecto</label>
    //       <input
    //       style={{width:'300px', margin:'10px', padding:'5px'}}
    //       type="text"
    //       class="form-control"
    //       id="projectType"
    //       value={nombreType}
    //       onChange={handleInputChangeType}
    //       />
    //       <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevoType} disabled={botonDeshabilitado6}>Añadir</button>
    //     </div>
    //   </form>
    //   {show && (
    //     <div className="modal">
    //       <div className="modal-content">
    //         <span className="close" onClick={hideModal}>
    //           &times;
    //         </span>
    //         <p style={{margin:'5px', padding:'5px'}}> Agregar clientes</p>
    //         <div >
    //           <input
    //             style={{width:'300px', margin:'10px', padding:'5px'}}
    //             type="text"
    //             placeholder="Nombre del nuevo cliente"
    //             value={nombre}
    //             onChange={handleInputChangeCliente}
    //           />
    //           <button className='btn btn-success' style={{width:'100px'}} onClick={agregarNuevoCliente} disabled={botonDeshabilitado2}>añadir</button>
    //         </div>
    //         <ul className="lista-sin-puntos">
    //           {clientes.map((cliente, index) => (
    //             // Usar el índice como clave si cliente.id es undefined
    //             <li key={cliente.clienteId || index}>
    //               <label>
    //                 <input
    //                 style={{marginRight:'10px'}}
    //                   type="checkbox"
    //                   checked={selectedClientes[cliente.clienteId] || false}
    //                   onChange={() => toggleClienteCheckbox(cliente.clienteId)}
    //                 />
    //                 {cliente.nombre}
    //               </label>
    //             </li>
    //           ))}
    //         </ul>

    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Config;
