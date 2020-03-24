import axios from "axios";
import server_config from '../helpers/server.js';
import {convertToRange, convertToDate, getPreviousMonths, THIS_MONTH, THIS_YEAR, getToday} from '../helpers/date.js';
import {convertToNumber, convertToMoney, encrypt} from '../helpers/general';
import xlsx from 'xlsx'

export const getExtratoMov = async (store, request = axios, selectedDate = store.state.selectedDate ) => {
  try {
    

    const cryptEmail = encrypt(store.state.user.email);
    const range = convertToRange(selectedDate);
    const response = await request.get(
        `${server_config.hostname}/extrato/getByMonth/${range.init}.${range.end}.${cryptEmail}`
    );
    const moviments = response.data;

    moviments.forEach(element => {
      element.checkboxDisable = true;
      element.dt_lanc = convertToDate(element.dt_lanc);
      element.dt_valor = convertToDate(element.dt_valor);
    });
    store.setState( {moviments})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
};




export const setExtratoUpload = (store, file) => {
  
  const newMov = [];
  let reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (event) => {

      getHistoric(store).then( historic => 
        {

          const wb = xlsx.read(event.target.result, {type:'binary'});
          const ws = wb.Sheets[wb.SheetNames[0]];
          const jsonWs = xlsx.utils.sheet_to_json(ws, {raw: false});
          const tipoConta = store.state.tipoConta;
          jsonWs.forEach(element => {
              const keys = Object.keys(element);
              const moviments = store.state.moviments;
              
              
              
              for (let i = 0; i < keys.length; i++) {
                  const key = keys[i];
    
                  if (i === 1 || i === 2) {
                    element[key]  = convertToDate(element[key]);                  
                  }
              }
    
              if (element.valor <= 0){
                  element.id_tipo = tipoConta.find(elem => elem.tipo_mov === 'S' ).id_tipo;
                  element.valor = element.valor * -1;
              }
               else{
               element.id_tipo = tipoConta.find(elem => elem.tipo_mov === 'E' ).id_tipo;
               }
    
               element.checked = false;
               element.checkboxDisable = false;
               element.categ_id = '';
    
               
               let lineExist = moviments.some( ( item, index) => 
                {   
                    let valor = (typeof item.valor === 'number') ? item.valor : Number(convertToNumber(item.valor));
                    return ( item.dt_lanc    === element.dt_lanc &&
                             valor      === element.valor )
                            //  item.descr === element.descr) 
                })
                
               if (!lineExist)
               {
                const histElement = historic.find( item => item.descr === element.descr )
                element.categ_id = (typeof histElement !== 'undefined') ? histElement.categ_id : '';
                newMov.push(element);
               }
               
          });

          store.setState({moviments: [...newMov, ...store.state.moviments]});
        } );

  }
}; 

export const setCheckbox = (store, index, checked) => {

        const moviments = store.state.moviments;
        moviments[index].checked = !moviments[index].checked ;
        store.setState({moviments});
        
  
  }; 

  export const setCategoria = (store, index, value) => {

    const moviments = store.state.moviments;
    moviments[index].categ_id = value;
    store.setState({moviments});
    

};   

export const saveMoviments = (store) => {

    const extrato = JSON.parse(JSON.stringify(store.state.moviments));

     const newExtrato = extrato.filter(item => ( item.checked && item.checkboxDisable === false ));
    
    for (let i = 0; i < newExtrato.length; i++) {
        delete newExtrato[i].checked;
        delete newExtrato[i].checkboxDisable;
        newExtrato[i].email = store.state.user.email
    }
    
    const params = { params:  newExtrato  };

    console.log(params);
    fetch(`${server_config.hostname}/extrato/add`, 
    {
         method: 'post',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify(params)
    })
    .then( response => response.json() )
    .then( data => console.log )
    .then( () => getExtratoMov(store))
    .then( () => requestSaldos(store))
    .catch( error => {
        console.log(error);
        return  error } );
};  


export const requestSaldos = (store) => {
  const cryptEmail = encrypt(store.state.user.email);
    const range = convertToRange(store.state.selectedDate);
    fetch(`${server_config.hostname}/extrato/getByMonth/${range.init}.${range.end}.${cryptEmail}/saldoTotal`)
    .then( response => response.json() )
    .then( data => {
        const saldoTotal = data;
        store.setState({saldoTotal})
    } )
    .catch( error => console.log() )

    .then( () => {
        fetch(`${server_config.hostname}/extrato/getByMonth/${range.init}.${range.end}.${cryptEmail}/saldoConta`)
        .then( response => response.json() )
        .then( data => {
            const saldoConta = data;
            store.setState({saldoConta})
        } )
        // .then( () => {
        //     actProjetado.getPrediction(store);
        // })
        .catch( error => console.log() )    
    } )

};


export const updateFields = (store, name, value, index) => {
  
    const moviments = JSON.parse(JSON.stringify(store.state.moviments));
    moviments[index][name] = value;
    store.setState( {moviments});
    console.log(store.state.moviments);
  };
  
  

  export const getHistoric = async (store, request = axios ) => {
    try {

      
      const rangeInit = convertToRange(getPreviousMonths( THIS_MONTH, THIS_YEAR, 3 )[0].key);

      const range = convertToRange(store.state.selectedDate);
      const cryptEmail = encrypt(store.state.user.email); 
      
      const response = await request.get(
          `${server_config.hostname}/extrato/getByMonth/${rangeInit.init}.${range.end}.${cryptEmail}`
      );
      
      return response.data;

    } catch (error) {
      const isError404 = error.response && error.response.status === 404;
      const status = isError404 ? "NOT_FOUND" : "ERROR";
      console.log(status);
    }
  };  

  export const updateMovimentTextContext = (store, value) => {
  
    const modalMoviment = JSON.parse(JSON.stringify(store.state.modalMoviment));
    modalMoviment.data.descr = value;
    store.setState( {modalMoviment});
    console.log(store.state.modalMoviment);
  }  


  export const updateMoviment = (store) => {
  
    const {data} = store.state.modalMoviment;
  
    const newMov = {  id: data.id,
                      id_tipo: data.id_tipo, 
                      dt_lanc: data.dt_lanc, 
                      dt_valor: data.dt_valor, 
                      descr: data.descr, 
                      valor: data.valor, 
                      categ_id: data.categ_id, 
                      email: encrypt(store.state.user.email) };
  
    
  
    fetch(`${server_config.hostname}/extrato/update`, 
    {
         method: 'post',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify(newMov)
    })
    .then( response => response.json() )
    .then( () => getExtratoMov(store) )
    .then( () => requestSaldos(store))
    .then( () => closeModalMov(store) )
    .catch( error => {
        console.log(error);
        return  error } );
  
  
  }  

  export const openModalMoviment = (store, i) => {
  
    let data = {};
  
    if (i >= 0) {  
      data = JSON.parse(JSON.stringify(store.state.extrato[i]));        
    }
  
  
    const modalMoviment = { open: true, data: data };
    store.setState( {modalMoviment});
  
  };

  export const closeModalMov = (store) => {
  
    const modalMoviment = { open: false, data: {} };
    store.setState( {modalMoviment});
  
  };

  
export const addMoviment = (store) => {
  
  const {data} = store.state.modalMoviment;

  data.dt_lanc = (typeof data.dt_lanc === 'undefined') ? getToday() : data.dt_lanc;
  data.dt_valor = (typeof data.dt_valor === 'undefined') ? getToday() : data.dt_valor;

  const newMov = { params: {  id_tipo: data.id_tipo, 
                              dt_lanc: data.dt_lanc, 
                              dt_valor: data.dt_valor, 
                              descr: data.descr, 
                              valor: data.valor, 
                              categ_id: data.categ_id, 
                              email: store.state.user.email } };
  console.log(newMov);
  fetch(`${server_config.hostname}/extrato/add`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(newMov)
  })
  .then( response => console.log(response.json()) )
  .then( () => getExtratoMov(store) )
  .then( () => requestSaldos(store))  
  .then( () => closeModalMov(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}

export const updateFieldsModal = (store, value) => {
  
  const modalMoviment = JSON.parse(JSON.stringify(store.state.modalMoviment));
  modalMoviment.data = value;
  store.setState( {modalMoviment});
  console.log(store.state.modalMoviment);
}

export const remove = (store, i) => {
  
  const moviments = JSON.parse(JSON.stringify(store.state.moviments));
  const id = moviments[i].id
  
  if (typeof id !== 'undefined') {
    const mov = { params: {  id: id,  
      email: store.state.user.email } };
  
    fetch(`${server_config.hostname}/extrato/del`, 
    {
         method: 'delete',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify(mov)
    })
    .then( response => response.json() )
    .then( () => getExtratoMov(store) )
    .then( () => requestSaldos(store)) 
    .catch( error => {
        console.log(error);
        return  error } );
  
  } else {
   
    const filtered = moviments.filter((elem, index) => index !== i);
    store.setState({moviments: filtered});

  }
}