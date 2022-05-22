import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/organisms/Navbar.organism';
import SideBar from '../components/organisms/Sidebar.organism';
import { NavbarProvider } from '../context/NavbarContext';
import Usuarios from '../pages/usuarios';
import CreateUsuario from '../pages/usuarios/Create';
import DetalleUsuario from '../pages/usuarios/[usuario]';
import EditUsuario from '../pages/usuarios/[usuario]/Edit';
import Empresas from '../pages/empresas';
import CreateEmpresa from '../pages/empresas/Create';
import DetalleEmpresa from '../pages/empresas/[empresa]';
import EditEmpresa from '../pages/empresas/[empresa]/Edit';
import Incidentes from '../pages/incidentes';
import MonitoreoAmbiental from '../pages/monitoreo';
import Parametros from '../pages/parametros';
import Proyectos from '../pages/proyectos';
import Repositorio from '../pages/repositorio';
import TipoIncidentes from '../pages/tipoIncidente';
import UnidadesMedida from '../pages/unidadesMedida';
import Login from '../pages/seguridad/Login';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ProjectProvider } from '../context/ProjectContext';
import React from 'react';
import CreateProyecto from '../pages/proyectos/Create';
import DetalleProyecto from '../pages/proyectos/[proyecto]';
import EditProyecto from '../pages/proyectos/[proyecto]/Edit';
import CreateTipoIncidente from '../pages/tipoIncidente/Create';
import DetalleTipoIncidente from '../pages/tipoIncidente/[tipoIncidente]';
import EditTipoIncidente from '../pages/tipoIncidente/[tipoIncidente]/Edit';
import MonitoreoProyecto from '../pages/monitoreo/[proyecto]';
import CreateIncidente from '../pages/incidentes/Create';
import DetalleIncidente from '../pages/incidentes/[incidente]';
import EditIncidente from '../pages/incidentes/[incidente]/Edit';
import Investigaciones from '../pages/investigaciones';

const Router = () => {

  const { infoUsuario, token } = useContext(UserContext);

  return (
    <BrowserRouter >
      {!(token && infoUsuario) ?
        <Switch >
          <Route exact path="/login" component={Login} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
        :
        <React.Fragment>
          <NavbarProvider>
            <NavBar />
            <SideBar />
          </NavbarProvider>
          <Switch >
            <Route exact path="/" render={() => <Redirect to="/monitoreoAmbiental" />} />
            <Route exact path="/unidadesMedida" component={UnidadesMedida} />

            <Route exact path="/parametros" component={Parametros} />

            <Route exact path="/empresas" component={Empresas} />
            <Route exact path="/empresas/create" component={CreateEmpresa} />
            <Route exact path="/empresas/:id" component={DetalleEmpresa} />
            <Route exact path="/empresas/:id/edit" component={EditEmpresa} />

            <Route exact path="/usuarios" component={Usuarios} />
            <Route exact path="/usuarios/create" component={CreateUsuario}/>
            <Route exact path="/usuarios/:id" component={DetalleUsuario}/>
            <Route exact path="/usuarios/:id/edit" component={EditUsuario}/>

            <Route exact path="/proyectos" component={Proyectos} />
            <Route exact path="/proyectos/create" component={CreateProyecto} />
            <Route exact path="/proyectos/:id" component={DetalleProyecto} />
            <Route exact path="/proyectos/:id/edit" component={EditProyecto} />
            
            <Route exact path="/tipoIncidentes" component={TipoIncidentes} />
            <Route exact path="/tipoIncidentes/create" component={CreateTipoIncidente} />
            <Route exact path="/tipoIncidentes/:id" component={DetalleTipoIncidente}/>
            <Route exact path="/tipoIncidentes/:id/edit" component={EditTipoIncidente} />
            
            <Route path="/monitoreoAmbiental">
              <ProjectProvider>
                <Route exact path="/monitoreoAmbiental" component={MonitoreoAmbiental} />
                <Route path="/monitoreoAmbiental/:idProyecto" component={MonitoreoProyecto} />
              </ProjectProvider>
            </Route>
            
            <Route exact path="/incidentes" component={Incidentes} />
            <Route exact path="/incidentes/create" component={CreateIncidente} />
            <Route exact path="/incidentes/:id" component={DetalleIncidente}/>
            <Route exact path="/incidentes/:id/edit" component={EditIncidente} />

            <Route exact path="/investigaciones" component={Investigaciones} />
            {/* <Route exact path="/investigaciones/create" component={CreateIncidente} />
            <Route exact path="/investigaciones/:id" component={DetalleIncidente}/>
            <Route exact path="/investigaciones/:id/edit" component={EditIncidente} /> */}

            <Route exact path="/repositorio" component={Repositorio} />
            <Route render={() => <Redirect to="/monitoreoAmbiental" />} />
          </Switch>
        </React.Fragment>
      }
    </BrowserRouter>
  );
}

export default Router;