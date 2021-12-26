import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/organisms/Navbar.organism';
import SideBar from '../components/organisms/Sidebar.organism';
import { NavbarProvider } from '../context/NavbarContext';
import Usuarios from '../pages/usuarios';
import Empresas from '../pages/empresas';
import Incidentes from '../pages/incidentes';
import MonitoreoAmbiental from '../pages/monitoreo';
import Parametros from '../pages/parametros';
import Proyectos from '../pages/proyectos';
import Repositorio from '../pages/repositorio';
import TipoIncidentes from '../pages/tipoIncidente';
import UnidadesMedida from '../pages/unidadesMedida';
import CrearUsuario from '../pages/usuarios/CrearUsuario';
import DetalleUsuario from '../pages/usuarios/DetalleUsuario';
import EditarUsuario from '../pages/usuarios/EditarUsuario';
import Login from '../pages/seguridad/Login';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import React from 'react';
import CrearProyecto from '../pages/proyectos/CrearProyecto';
import CreateEmpresa from '../pages/empresas/Create';
import DetalleEmpresa from '../pages/empresas/[empresa]';
import EditEmpresa from '../pages/empresas/[empresa]/Edit';

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
            <Route exact path="/" render={() => <Redirect to="/proyectos" />} />
            <Route exact path="/empresas" component={Empresas} />
            <Route exact path="/empresas/create" component={CreateEmpresa} />
            <Route exact path="/empresas/:id" component={DetalleEmpresa} />
            <Route exact path="/empresas/:id/edit" component={EditEmpresa} />
            <Route exact path="/incidentes" component={Incidentes} />
            <Route exact path="/monitoreoAmbiental" component={MonitoreoAmbiental} />
            <Route exact path="/parametros" component={Parametros} />
            <Route exact path="/proyectos" component={Proyectos} />
            <Route exact path="/proyectos/crear" component={CrearProyecto} />
            <Route exact path="/proyectos/detalle/:id" component={Proyectos} />
            <Route exact path="/proyectos/editar/:id" component={Proyectos} />
            <Route exact path="/repositorio" component={Repositorio} />
            <Route exact path="/tipoIncidentes" component={TipoIncidentes} />
            <Route exact path="/unidadesMedida" component={UnidadesMedida} />
            <Route exact path="/usuarios" component={Usuarios} />
            <Route exact path="/usuarios/crear" component={CrearUsuario}/>
            <Route exact path="/usuarios/:id" component={DetalleUsuario}/>
            <Route exact path="/usuarios/:id/edit" component={EditarUsuario}/>
            <Route render={() => <Redirect to="/proyectos" />} />
          </Switch>
        </React.Fragment>
      }
    </BrowserRouter>
  );
}

export default Router;