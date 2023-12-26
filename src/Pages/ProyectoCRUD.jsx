
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TableComponent from '../components/Table/TableComponent';
import { Dropdown } from 'react-bootstrap';
import '../App.css'

function ProyectoCRUD() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [codigo, setCodigo] = useState("");
    const [nomProyecto, setNomProyecto] = useState("");
    const [cliente, setCliente] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [estado, setEstado] = useState("");
    const [dia_inicio, setDiaInicio] = useState(Date);
    const [dia_fin, setDiaFin] = useState(Date);
    const [liderProyecto, setLiderProyecto] = useState("");
    const [etapa, setEtapa] = useState("");
    const [categorias, setCategorias] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [proyectos, setProyectos] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get(
        "https://localhost:7126/api/Proyecto/GetProyecto"
        );
        setProyectos(result.data);
        console.log(result.data);
    }

    function handleNuevoProyecto() {
        navigate('/form');
    }


    async function editProyecto(proyectos) {
        setId(proyectos.id);
        setCodigo(proyectos.codigo);
        setNomProyecto(proyectos.nombreProyecto);
        setCliente(proyectos.cliente);
        setPrioridad(proyectos.prioridad);
        setEstado(proyectos.estado);
        setDiaInicio(proyectos.dia_inicio);
        setDiaFin(proyectos.dia_fin);
        setEtapa(proyectos.etapas);
        setLiderProyecto(proyectos.liderProyecto);
        setCategorias(proyectos.categorias);
        setComentarios(proyectos.comentarios);

        navigate({
            pathname: `/form/${proyectos.id}`,
            state: { proyectos }
        });

    }

    async function Delete(id) {
        await axios.delete("https://localhost:7126/api/Proyecto/Delete/" + id);
        alert("Eliminar?");
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
        setCategorias("");
        setComentarios("");
        Load();
    }
    
    

    return (
        <div>
            <Dropdown
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                marginRight: '200px', 
                marginTop: '25px',   
            }}
            >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Filtrar
                </Dropdown.Toggle>

                <Dropdown.Menu className="mi-dropdown-menu">
                    <Dropdown.Item >
                        <input
                            type="text"
                            className="form-control"
                            id="cliente"
                            placeholder="Buscar por cliente"
                            value={filtro.cliente}
                            onChange={(e) => setFiltro({ ...filtro, cliente: e.target.value })}
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </Dropdown.Item>

                    <Dropdown.Item>
                    <select
                        id="prioridad"
                        value={filtro.prioridad}
                        onChange={(e) => setFiltro({ ...filtro, prioridad: e.target.value })}
                        onClick={(e) => e.stopPropagation()} 
                        className="form-control"
                    >
                        <option value="">Seleccionar Prioridad</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                    </Dropdown.Item>

                    <Dropdown.Item>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre del proyecto"
                        value={filtro.proyecto}
                        onChange={(e) => setFiltro({ ...filtro, proyecto: e.target.value })}
                        onClick={(e) => e.stopPropagation()} 
                        style={{width:'250px'}}
                    />
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setFiltro({
                            cliente: '',
                            prioridad: '',
                            proyecto: '',
                            });
                        }}
                        >
                        Limpiar
                        </button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <button className="btn btn-primary mt-4" 
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                marginRight: '20px', 
                marginTop: '20px',   
            }}
            onClick={handleNuevoProyecto}>
                Nuevo Proyecto
            </button>
            <br />
            <TableComponent
                proyectos={proyectos}
                editProyecto={editProyecto}
                Delete={Delete}
                filtro={filtro}
            />
        </div>
    );
}
export default ProyectoCRUD;
