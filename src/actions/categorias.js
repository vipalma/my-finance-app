import axios from "axios";

import server_config from '../helpers/server.js';
import { useAuth0 } from "../react-auth0-wrapper";
import { encrypt, decrypt } from "../helpers/general.js";

export const getCategorias = async (store, request = axios) => {
  try {    

    const cryptEmail = encrypt(store.state.user.email);

    const response = await request.get(
        `${server_config.hostname}/categoria/getDropdown/${cryptEmail}`
    );
    const categoriasDropDown = response.data;
    store.setState( {categoriasDropDown})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
};

export const getCategoriasAll = async (store, request = axios) => {
  try {    
    const cryptEmail = encrypt(store.state.user.email);
    const response = await request.get(
        `${server_config.hostname}/categoria/getAll/${cryptEmail}`
    );
    const categoriasAll = response.data;
    store.setState( {categoriasAll})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
};

export const onDelIndChange = (store) => {
  
  const modalCategoria = JSON.parse(JSON.stringify(store.state.modalCategoria));

  modalCategoria.data.del_ind = !modalCategoria.data.del_ind;

  store.setState( {modalCategoria});

  console.log(store.state.modalCategoria);

}


export const openModalCategoria = (store, i) => {
  
  let data = {};

  if (i >= 0) {  
    data = JSON.parse(JSON.stringify(store.state.categoriasAll[i]));        
    data.del_ind = (typeof data.del_ind === 'undefined') ? false : data.del_ind;
  }


  

  const modalCategoria = { open: true, data: data };
  store.setState( {modalCategoria});

};

export const closeModalCategoria = (store) => {
  
  const modalCategoria = { open: false, data: {} };
  store.setState( {modalCategoria});

};

export const updateCategoriaTextContext = (store, value) => {
  
  const modalCategoria = JSON.parse(JSON.stringify(store.state.modalCategoria));
  modalCategoria.data.categoria = value;
  store.setState( {modalCategoria});
  console.log(store.state.modalCategoria);
}

export const updateCategoria = (store) => {
  
  const {data} = store.state.modalCategoria;

  const newCateg = { categ_id: data.categ_id, categoria: data.categoria, del_ind: data.del_ind, email: encrypt(store.state.user.email) };

  

  fetch(`${server_config.hostname}/categoria/update`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(newCateg)
  })
  .then( response => response.json() )
  .then( () => getCategoriasAll(store) )
  .then( () => closeModalCategoria(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}

export const addCategoria = (store) => {
  
  const {data} = store.state.modalCategoria;

  data.del_ind = (typeof data.del_ind === 'undefined') ? false : data.del_ind;
  const newCateg = { params: { categoria: data.categoria, del_ind: data.del_ind, email: store.state.user.email } };
  console.log(newCateg);
  fetch(`${server_config.hostname}/categoria/add`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(newCateg)
  })
  .then( response => console.log(response.json()) )
  .then( () => getCategoriasAll(store) )
  .then( () => getCategorias(store) )
  .then( () => closeModalCategoria(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}


export const removerCategoria = (store) => {
  
  const {data} = store.state.modalCategoria;

  const categ = { categ_id: data.value, email: encrypt(store.state.user.email)  };

  fetch(`${server_config.hostname}/categoria/del`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(categ)
  })
  .then( response => response.json() )
  .then( () => getCategoriasAll(store) )
  .then( () => getCategorias(store) )
  .then( () => closeModalCategoria(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}
