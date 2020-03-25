import React, { useEffect } from "react";
import clsx from 'clsx';
import ResponsiveDrawer from "./components/drawer/ResponsiveDrawer";
import Resume from "./components/resume/Resume.js";
import Analise from "./pages/Analise";
import Home from "./pages/Home";
import Extrato from "./pages/Extrato";
import { HashRouter  as Router, Route } from "react-router-dom";
import useGlobal from "./store";
import "semantic-ui-css/semantic.min.css";
import ConfigCateg from "./pages/ConfigCateg";
import ConfigTpConta from "./pages/ConfigTpConta";
import ConfigProjetado from "./pages/ConfigProjetado";
import "tachyons";
import { getFutureMonths } from "./helpers/date.js";
import Login from "./pages/Login";
import { useStyles } from './styles';
import {initFirebase} from './config/firebaseConfig'

const {createComponentWithAuth, firebaseAppAuth} = initFirebase();

const App = (WrappedComponentProps) => {

  const [globalState, globalActions] = useGlobal();
  const classes = useStyles();
  const { selectedDate, moviments, projetado, drawer } = globalState;
  const { open } = drawer;
  const { actAuth } = globalActions;
  
  const { user } = WrappedComponentProps;

  const email = () => {
    if (typeof user === 'undefined' || user === null) {
      return null;      
    }else{
      return  user.email;        
    }

    
  }
  
  useEffect(() => {
    actAuth.setFirebase(WrappedComponentProps, firebaseAppAuth);
  }, [WrappedComponentProps]);

  useEffect(() => {
    if (email() !== null) {
    globalActions.actDates.selectDate([], getFutureMonths()[0].value);
    globalActions.actFechamentos.getAll();
    globalActions.actProjetado.getPrediction();
    globalActions.actExtrato.requestSaldos();
    globalActions.actCategorias.getCategorias();
    globalActions.actTipoContas.getTipoContasDropDown();
    globalActions.actTipoContas.getTipoContas();
    }
  }, [user]);

  useEffect(() => {
    if (email() !== null) {
    globalActions.actProjetado
      .getProjetado()
      .then(() => globalActions.actExtrato.getExtratoMov())
      .then(() => globalActions.actCategorias.getCategoriasAll())
      .then(() => globalActions.actProjetado.getAnaliseData());
    }
  }, [selectedDate,user]);

  

  useEffect(() => {
    if (email() !== null) {
    globalActions.actProjetado.getAnaliseData();
    }
  }, [moviments, projetado]);


  if (email() === null) {
    return (
      <Login></Login>
    );
  }


  return (
    <Router>
      <ResponsiveDrawer />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      {/* <div className={classes.drawerHeader} /> */}
      {/* <MenuNav /> */}
      <Resume />
      <Route exact path="/" component={Home} />
      <Route path="/Analise" component={Analise} />
      <Route path="/Extrato" component={Extrato} />
      <Route path="/ConfigCateg" component={ConfigCateg} />
      <Route path="/ConfigTpConta" component={ConfigTpConta} />
      <Route path="/ConfigProjetado" component={ConfigProjetado} />
      <Route path="/Login" component={Login} />
      </main>
    </Router>
  );
}


export default createComponentWithAuth(App);