import axios from "axios";
import server_config from '../helpers/server.js';
import { encrypt } from "../helpers/general.js";

export const getTipoContas = async (store, request = axios) => {
  try {
    const cryptEmail = encrypt(store.state.user.email);
    const response = await request.get(
        `${server_config.hostname}/tipoConta/getAll/${cryptEmail}`
    );
    const tipoConta = response.data;
    store.setState( {tipoConta})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
};

export const getTipoContasDropDown = async (store, request = axios) => {
  try {
    const cryptEmail = encrypt(store.state.user.email);
    const response = await request.get(
        `${server_config.hostname}/tipoConta/getDropdown/${cryptEmail}`
    );
    const tipoContaDropDown = response.data;
    store.setState( {tipoContaDropDown})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
};

export const openModalTpConta = (store, i) => {
  
  let data = {};

  if (i >= 0) {  
    data = JSON.parse(JSON.stringify(store.state.tipoConta[i]));        
  }

  const modalTpConta = { open: true, data: data };
  store.setState( {modalTpConta});

};

export const closeModalTpConta = (store) => {
  
  const modalTpConta = { open: false, data: {} };
  store.setState( {modalTpConta});

};

export const updateTipo = (store, value) => {
  
  const modalTpConta = JSON.parse(JSON.stringify(store.state.modalTpConta));
  modalTpConta.data.tipo = value;
  store.setState( {modalTpConta});
  console.log(store.state.modalTpConta);
}

export const updateVencimento = (store, value) => {
  
  const modalTpConta = JSON.parse(JSON.stringify(store.state.modalTpConta));
  modalTpConta.data.vencimento = value;
  store.setState( {modalTpConta});
  console.log(store.state.modalTpConta);
}

export const updateTpConta = (store) => {
  
  const {data} = store.state.modalTpConta;

  const update = { email: store.state.user.email , id_tipo: data.id_tipo, tipo: data.tipo, vencimento: data.vencimento, tipo_mov: data.tipoMov };

  fetch(`${server_config.hostname}/tipoConta/update`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(update)
  })
  .then( response => response.json() )
  .then( () => getTipoContas(store) )
  .then( () => getTipoContasDropDown(store) )
  .then( () => closeModalTpConta(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}

export const addTpConta = (store) => {
  
  const {data} = store.state.modalTpConta;

  const insert = { params: {  tipo: data.tipo, vencimento: data.vencimento, tipo_mov: data.tipoMov, email: store.state.user.email } };

  fetch(`${server_config.hostname}/tipoConta/add`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(insert)
  })
  .then( response => response.json() )
  .then( () => getTipoContas(store) )
  .then( () => getTipoContasDropDown(store) )
  .then( () => closeModalTpConta(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}

export const updateFields = (store, name, value) => {
  
  const modalTpConta = JSON.parse(JSON.stringify(store.state.modalTpConta));
  modalTpConta.data[name] = value;
  store.setState( {modalTpConta});
  console.log(store.state.modalTpConta);
}

