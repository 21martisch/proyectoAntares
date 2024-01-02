import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import '../../App.css';
import moment from 'moment';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function FormComponent(){
    const location = useLocation();
    const navigate = useNavigate();
    const { id: urlId } = useParams();
    const [id, setId] = useState("");
    const [codigo, setCodigo] = useState([]);
    const [selectedTipo, setSelectedCodigo] = useState('');
    const [codigoGenerado, setCodigoGenerado] = useState('');
    const [consecutivo, setConsecutivo] = useState(0);
    const [lastConsecutivo, setLastConsecutivo] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [nomProyecto, setNomProyecto] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [estado, setEstado] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');
    const [dia_inicio, setDiaInicio] = useState(Date);
    const [dia_fin, setDiaFin] = useState(Date);
    const [liderProyecto, setLiderProyecto] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [proyectos, setProyectos] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [etapa, setEtapa] = useState([]);
    const [selectedEtapa, setSelectedEtapa] = useState('');
    const [unidadesNegocio, setUnidadesNegocio] = useState([]);
    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedUnidadId, setSelectedUnidadId] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedAreaId, setSelectedAreaId] = useState(null); 
    
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await axios.get('https://localhost:7126/api/Proyecto/activos');
                setCliente(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        };

        obtenerClientes();
    }, []);

    const handleClienteChange = (event) => {
        const selectedClienteId = event.target.value;
    
        const selectedCliente = cliente.find(c => c.clienteId === parseInt(selectedClienteId));
    
        if (selectedCliente) {
            setSelectedCliente(selectedCliente);
            setSelectedClienteId(selectedClienteId);
            generarCodigo(selectedClienteId, selectedAreaId);
            console.log(`Cliente seleccionado: ${JSON.stringify(selectedCliente)}`);
        } else {
            console.log(`No se encontró un cliente con el ID: ${selectedClienteId}`);
        }
    };

    useEffect(() => {
        const obtenerEtapas = async () => {
            try {
                const response = await axios.get('https://localhost:7126/api/Proyecto/GetEtapa');
                setEtapa(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener etapas:', error);
            }
        };

        obtenerEtapas();
    }, []);

    const handleEtapaChange = (event) => {
        const selectedEtapaId = event.target.value;
    
        const selectedEtapa = etapa.find(c => c.etapasId === parseInt(selectedEtapaId));
        
        if (selectedEtapa) {
            setSelectedEtapa(selectedEtapa);
            
            console.log(`etapa seleccionada: ${JSON.stringify(selectedEtapa)}`);
            
        } else {
            console.log(`No se encontró una etapa con el ID: ${selectedEtapaId}`);
        }
    };

    useEffect(() => {
        const obtenerEstados = async () => {
            try {
                const response = await axios.get('https://localhost:7126/api/Proyecto/GetEstados');
                setEstado(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener estados:', error);
            }
        };

        obtenerEstados();
    }, []);

    const handleEstadoChange = (event) => {
        const selectedEstadoId = event.target.value;
    
        // Buscar el cliente seleccionado en la lista
        const selectedEstado = estado.find(c => c.estadoId === parseInt(selectedEstadoId));
    
        // Verificar si se encontró el cliente
        if (selectedEstado) {
            setSelectedEstado(selectedEstado);
            console.log(`estado seleccionada: ${JSON.stringify(selectedEstado)}`);
        } else {
            console.log(`No se encontró un estado con el ID: ${selectedEstadoId}`);
        }
    };

    useEffect(() => {
        const obtenerTipos = async () => {
            try {
                const response = await axios.get('https://localhost:7126/api/Proyecto/GetType');
                setCodigo(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener tipos:', error);
            }
        };

        obtenerTipos();
    }, []);

    const handleTypeChange = (event) => {
        const selectedTipoId = event.target.value;
    
        const selectedTipo = codigo.find(t => t.typeId === parseInt(selectedTipoId));
    
        if (selectedTipo) {
            setSelectedCodigo(selectedTipo);
            
            console.log(`tipo seleccionado: ${JSON.stringify(selectedTipo)}`);
        } else {
            console.log(`No se encontró un tipo con el ID: ${selectedTipoId}`);
        }
    };

    const generarCodigo = (selectedClienteId, selectedAreaId) => {
        if (proyectos && Array.isArray(proyectos)) {
            console.log("Proyectos existentes:", proyectos);
            const primeraLetra = selectedTipo && selectedTipo.nombre ? selectedTipo.nombre.charAt(0).toUpperCase() : '';
            const year = new Date().getFullYear().toString().slice(-2);
            const nextConsecutivo = proyectos.length + 1;
            const codigoGenerado = `${primeraLetra}.${year}${selectedClienteId}${nextConsecutivo}.${selectedAreaId}`;
            setCodigoGenerado(codigoGenerado);
            console.log(`Código generado: ${codigoGenerado}`);
        } else {
            console.error("Error: La variable 'proyectos' no está definida o no es un array.");
        }
    };
    const handleUnidadChange = (event) => {
        const selectedUnidadId = event.target.value;
    
        const selectedUnidad = unidadesNegocio.find(unidad => unidad.unidadId === parseInt(selectedUnidadId));
    
        if (selectedUnidad) {
            setSelectedUnidad(selectedUnidad);
            setSelectedUnidadId(selectedUnidadId);
            setSelectedArea(''); 
            console.log(`Unidad seleccionada: ${JSON.stringify(selectedUnidad)}`);
        } else {
            console.log(`No se encontró una unidad con el ID: ${selectedUnidadId}`);
        }
    };

    const handleAreaChange = (event) => {
        const selectedAreaId = event.target.value;
        setSelectedArea(selectedAreaId);
        setSelectedAreaId(selectedAreaId); 
        console.log(`Área seleccionada: ${selectedAreaId}`);
        generarCodigo(selectedClienteId, selectedAreaId);
        
    };

    

    useEffect(() => {
        console.log('Efecto ejecutado');
        
            const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(urlId));
            if (proyecto) {
                console.log(proyecto)
                setSelectedCodigo(proyecto.codigo);
                setNomProyecto(proyecto.nombreProyecto);
                const clienteString = Array.isArray(proyecto.cliente) ? proyecto.cliente[0] : proyecto.cliente;
                const selectedCliente = Array.isArray(proyecto.cliente) ? proyecto.cliente[0] : cliente.find(c => c.nombre === clienteString);
                setSelectedCliente(selectedCliente);
                console.log('Cliente después de set:', clienteString)
                setPrioridad(proyecto.prioridad);
                const estadoString = Array.isArray(proyecto.estado) ? proyecto.estado[0] : proyecto.estado;
                const selectedEstado = Array.isArray(proyecto.estado) ? proyecto.estado[0] : estado.find(est => est.nombreEstado === estadoString);
                setSelectedEstado(selectedEstado);
                setDiaInicio(moment(proyecto.diaInicio).format('YYYY-MM-DD'));
                setDiaFin(moment(proyecto.diaFin).format('YYYY-MM-DD'));
                setLiderProyecto(proyecto.liderProyecto);
                const etapaString = Array.isArray(proyecto.etapa) ? proyecto.etapa[0] : proyecto.etapa;
                const selectedEtapa = Array.isArray(proyecto.etapa) ? proyecto.etapa[0] : etapa.find(e => e.nombreEtapa === etapaString);
                setSelectedEtapa(selectedEtapa);
                const unidadString = Array.isArray(proyecto.unidadesNegocio) ? proyecto.unidadesNegocio[0] : proyecto.unidadesNegocio;
                const selectedUnidad = Array.isArray(proyecto.unidadesNegocio)
                    ? proyecto.unidadesNegocio.find(
                        unidad =>
                            unidad.unidadId === selectedUnidadId &&
                            (!selectedArea || unidad.areas.some(area => area.areaId === selectedArea))
                        )
                    : unidadesNegocio.find(
                        unidad =>
                            unidad.unidadId === selectedUnidadId &&
                            (!selectedArea || unidad.areas.some(area => area.areaId === selectedArea))
                        );
                setSelectedUnidad(selectedUnidad);
                console.log(unidadString)
                setComentarios(proyecto.comentarios);
            }else{
                Load()
            }
        
        console.log('ID en la URL:', urlId);
        console.log('Proyectos:', proyectos);
        console.log('IDs de Proyectos:', proyectos.map(proyecto => proyecto.id));
    }, [urlId, proyectos]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7126/api/Proyecto/unidades-negocio');
                setUnidadesNegocio(response.data);
                console.log(selectedUnidad)
            } catch (error) {
                console.error('Error al obtener unidades de negocio:', error);
            }
        };

        fetchData();
    }, []);

    

    async function Load() {
        const result = await axios.get(
        "https://localhost:7126/api/Proyecto/GetProyecto"
        );
        setProyectos(result.data);
        console.log(result.data);
        generarCodigo(selectedClienteId, selectedAreaId);
    }

    async function Save(event) {
        event.preventDefault();
    
        try {
            
            await axios.post("https://localhost:7126/api/Proyecto/AddProyecto", {
                
                codigo: codigoGenerado,
                nombreProyecto: nomProyecto,
                cliente: selectedCliente.nombre,
                prioridad: prioridad,
                estado: selectedEstado.nombreEstado,
                diaInicio: dia_inicio,
                diaFin: dia_fin,
                etapa: selectedEtapa.nombreEtapa,
                liderProyecto: liderProyecto,
                categorias: selectedUnidad.nombreUnidad,
                comentarios: comentarios,
            }, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
    
            alert("Proyecto agregado");            
            setCodigo("");
            setNomProyecto("");
            setCliente("");
            setPrioridad("");
            setEstado("");
            setDiaInicio("");
            setDiaFin("");
            setEtapa("");
            setLiderProyecto("");
            setUnidadesNegocio("");
            setComentarios("");
    
            navigate('/proyectoCrud');
        } catch (error) {
            console.error("Error en la solicitud Axios:", error);
            alert("Error al agregar el proyecto");
        }
    }
    

    async function UpdateProyecto(event) {
        event.preventDefault();
            try {
            const proyecto = proyectos.find((u) => u.id === parseInt(urlId));
        
            if (proyecto) {
                await axios.patch(
                `https://localhost:7126/api/Proyecto/UpdateProyecto/${proyecto.id}`,
                {
                    id: proyecto.id,
                    codigo: codigoGenerado,
                    nombreProyecto: nomProyecto,
                    cliente: selectedCliente.nombre,
                    prioridad: prioridad,
                    estado: selectedEstado.nombreEstado,
                    diaInicio: moment(dia_inicio).format('YYYY-MM-DD'),
                    diaFin:  moment(dia_fin).format('YYYY-MM-DD'),
                    etapa: selectedEtapa.nombreEtapa,
                    liderProyecto: liderProyecto,
                    categorias: selectedUnidad.nombreUnidad,
                    comentarios: comentarios,
                }
                );
                alert("Actualizado correctamente");
                // Restablecer estados después de la actualización
                setId("");
                setCodigo("");
                setNomProyecto("");
                setCliente("");
                setPrioridad("");
                setEstado("");
                setDiaInicio("");
                setDiaFin("");
                setEtapa("");
                setLiderProyecto("");
                setUnidadesNegocio("");
                setComentarios("");

                navigate('/proyectoCrud');
            } else {
                alert("El proyecto no se encontró para la actualización");
            }
            } catch (err) {
            alert(err);
            }
    }

    const handleVolver = () => {
        navigate('/proyectoCrud');
    };

    return (
        
            <form style={{margin:'30px'}}>
                <button onClick={handleVolver} className='btn btn-success m-2'>
                    Volver
                </button>
                <div className="row">
                    <div class=" col-md-4">
                        <label className='p-2'>Código</label>
                        <select onChange={handleTypeChange} type="text" class="form-control" >
                            <option value="">Selecciona un tipo</option>
                            {Array.isArray(codigo) && codigo.map(c => (
                            <option key={c.typeId} value={c.typeId}>
                                {c.nombre}
                            </option>
                            ))}
                        </select>
                        <input
                        style={{marginTop:'10px'}}
                        type="text"
                        class="form-control"
                        id="codigo"
                        value={codigoGenerado}
                        readOnly
                        />
                    </div>
                    <div class="col-md-4 ">
                        <label className='p-2'>Nombre Proyecto</label>
                        <input
                        
                        type="text"
                        class="form-control"
                        id="nombreProyecto"
                        value={nomProyecto}
                        onChange={(event) => {
                            setNomProyecto(event.target.value);
                        }}
                        />
                    </div>
                    <div class="col-md-4">
                        <label className='p-2'>Cliente</label>
                        
                        <select onChange={handleClienteChange } type="text" class="form-control"  value={selectedCliente ? selectedCliente.clienteId : ""}
                        >
                            
                            <option value="">Selecciona un cliente</option>
                            {Array.isArray(cliente) && cliente.map(cliente => (
                            <option key={cliente.clienteId} value={cliente.clienteId} >
                                {cliente.nombre}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div class="col-md-4 ">
                        <label className='p-2'>Prioridad</label>
                        <select type="text" class="form-control" id="prioridad"  value={prioridad} onChange={(event) => {setPrioridad(event.target.value);}}>
                            <option value="">Selecciona...</option>
                            <option value="Media" >Media</option>
                            <option value="Alta">Alta</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>
                    
                    
                    <div class="col-md-4 ">
                        <label className='p-2'>Dia Inicio</label>
                        <input
                        
                        type="date"
                        class="form-control"
                        id="diaInicio"
                        value={dia_inicio}
                        onChange={(event) => {
                            setDiaInicio(event.target.value);
                        }}
                        />
                    </div>
                    <div class="col-md-4 ">
                        <label className='p-2'>Dia Fin</label>
                        <input
                        
                        type="date"
                        class="form-control"
                        id="diaFin"
                        value={dia_fin}
                        onChange={(event) => {
                            setDiaFin(event.target.value);
                        }}
                        />
                    </div>
                    <div class="col-md-4 ">
                        <label className='p-2'>Estado</label>
                        <select onChange={handleEstadoChange} type="text" class="form-control" value={selectedEstado ? selectedEstado.estadoId : ""} >
                            <option value="">Selecciona un estado</option>
                            {Array.isArray(estado) && estado.map(e => (
                            <option key={e.estadoId} value={e.estadoId}>
                                {e.nombreEstado}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div class="col-md-4 ">
                        <label className='p-2'>Lider del proyecto</label>
                        <input
                        
                        type="text"
                        class="form-control"
                        id="liderProyecto"
                        value={liderProyecto}
                        onChange={(event) => {
                            setLiderProyecto(event.target.value);
                        }}
                        />
                    </div>
                    <div class="col-md-4 ">
                        <label className='p-2'>Etapas</label>
                        <select onChange={handleEtapaChange} type="text" class="form-control" value={selectedEtapa ? selectedEtapa.etapasId : ""}>
                            <option value="">Selecciona una etapa</option>
                            {Array.isArray(etapa) && etapa.map(etapa => (
                            <option key={etapa.etapasId} value={etapa.etapasId}>
                                {etapa.nombreEtapa}
                            </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-4">
                        <label className='p-2' htmlFor="unidad">Unidad de negocio</label>
                        <select
                            
                            id="unidad"
                            name="unidad"
                            type="text"
                            className="form-control"
                            onChange={handleUnidadChange}
                            value={selectedUnidadId}
                        >
                            <option value="">Selecciona una unidad de negocio</option>
                            {Array.isArray(unidadesNegocio) && unidadesNegocio.map(unidad => (
                                <option key={unidad.unidadId} value={unidad.unidadId}>
                                    {unidad.nombreUnidad}
                                </option>
                            ))}
                        </select>

                        {selectedUnidad && (
                        <div>
                            <label className='p-2' htmlFor="area">Área</label>
                            <select
                            id="area"
                            name="area"
                            type="text"
                            className="form-control"
                            onChange={handleAreaChange}
                            value={selectedArea}
                            >
                            <option value="">Selecciona un área</option>
                            {selectedUnidad.areas && selectedUnidad.areas.map(area => (
                                <option key={area.areaId} value={area.areaId}>
                                {area.nombreArea}
                                </option>
                            ))}
                            </select>
                        </div>
                        )}
                    </div>
                    <div class="col-md-4">
                        <label className='p-2'>Comentarios</label>
                        <input
                        
                        type="text"
                        class="form-control"
                        id="comentarios"
                        value={comentarios}
                        onChange={(event) => {
                            setComentarios(event.target.value);
                        }}
                        />
                    </div>

                </div>

                <div className='d-flex flex-wrap justify-content-center mt-4'>
                    <button className="btn btn-primary  col-3" onClick={Save} style={{width:'100px', marginRight: '10px'}}>
                        Save
                    </button>
                    <button className="btn btn-warning col-3 " style={{width:'100px', marginLeft: '10px'}} onClick={UpdateProyecto}>
                        Update
                    </button>
                </div>
            </form>
        
    );
};

export default FormComponent;

