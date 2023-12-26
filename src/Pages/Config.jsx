import React, { useState, useEffect, Component } from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import img from '../components/Configuraciones/fondoCard.jpg'
import Card from '../components/Configuraciones/card';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Config = () => {
  const navigate = useNavigate();
  

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
