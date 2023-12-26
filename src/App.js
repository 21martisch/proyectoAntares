import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import ProyectoCRUD from './Pages/ProyectoCRUD';
import Config from './Pages/Config';
import Cliente from './components/Configuraciones/configClientes';
import Etapa from './components/Configuraciones/configEtapas';
import Unidades from './components/Configuraciones/configUnidades';
import Areas from './components/Configuraciones/configArea';
import Estado from './components/Configuraciones/configEstados';
import Type from './components/Configuraciones/configType';

import Home from './Pages/Home';
import './App.css';
import FormComponent from './components/Form/FormComponent';
import TablaComponent from './components/Table/TableComponent';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectoCrud" element={<ProyectoCRUD />} />
          <Route path="/form" element={<FormComponent />} />
          <Route path="/form/:id" element={<FormComponent />} />
          <Route path="/tabla" element={<TablaComponent />} />
          <Route path="/config" element={<Config />} />
          <Route path="/configClientes" element={<Cliente />} />
          <Route path="/configEtapas" element={<Etapa />} />
          <Route path="/configUnidades" element={<Unidades />} />
          <Route path="/configArea" element={<Areas />} />
          <Route path="/configEstados" element={<Estado />} />
          <Route path="/configType" element={<Type />} />

      </Routes>
      </Router>
    </>
  );
}

export default App;
