import axios from "axios";
import server_config from '../helpers/server.js';
import {checkPeriodicity, convertToRange, convertToDate, getMonth, getYear, convDateToMonthYear, convMonthYear, THIS_MONTH, THIS_YEAR, getFutureMonths, getPreviousMonth, getMonthRange} from '../helpers/date.js';
import {convertToNumber, encrypt, remove_character, remove_first_character} from '../helpers/general';

export const getAnaliseData = (store) => {

  const { categoriasAll, moviments, projetado, selectedDate} = store.state;
  let noProj = [];
  let justProj = [];
  let realProj = [];

  for (let i = 0; i < categoriasAll.length; i++) {
     const {categ_id} = categoriasAll[i];
      
     
     const mov =  moviments.reduce( (acc, item) => {    
         return categ_id === item.categ_id ? acc += Number(convertToNumber(item.valor)) : acc;
      }, 0)

      const proj =  projetado.reduce( (acc, item) => {
          return categ_id === item.categ_id && checkPeriodicity(item.init_date, convertToRange(selectedDate).init, item.period) 
           ? acc += Number(convertToNumber(item.valor)) : acc;
       }, 0)        

       let obj = {categ_id: categ_id, custoReal: mov, custoProjetado: proj, dif: (proj - mov)  };
      

       (mov > 0 && proj >= 0) ? realProj.push(obj) 
       : (mov === 0 && proj > 0) ? justProj.push(obj) 
       : noProj.push(obj) ;

  }

  store.setState({analise: [...realProj, ...justProj, ...noProj] });

} 

export const getAll = async (store, request = axios) => {

  

  try {
    const cryptEmail = encrypt(store.state.user.email);       
    const response = await request.get(
        `${server_config.hostname}/projetado/getAll/${cryptEmail}`
    );
    const projetadoConfig = response.data;  
    store.setState( {projetadoConfig})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
}; 


// export const onConnect = async (store, request = axios) => {
  
//   const base64 = btoa('app.bbva.appid:GTqyMQ%VJMbmuURMRch5N@$FcmSIfCPzVtcGSIsU@rkt7beBFuBkg6e3e@1QTPHf')
//   const AUTH = 'Basic ' + base64;

//   fetch(`https://connect.bbva.com/token?grant_type=client_credentials`, 
//   {
//        method: 'post',
//        headers: { Host: 'connect.bbva.com',
//                   Authorization: AUTH,
//                   'Content-Type': 'application/json'},
//       //  body: JSON.stringify(update)
//   })
//   .then( (response) => response.json())
//   .then( data => {
//       console.log(data);
//       const {access_token} = data;
       

//       fetch('https://apis.bbva.com/paystats_sbx/4/info/merchants_categories', 
//       {
//            method: 'get',
//            headers: { Authorization: `jwt ${access_token}`,
//               'Accept': 'application/json'} 
//       })
//       .then( response => response.json() )
//       .then( res => {
//         console.log(res.data);
//       } )
//       .catch( error => {
//           console.log(error);
//           return  error } );   

//   })
//   .catch( error => {
//       console.log(error);
//       return  error } );    

// }


export const getProjetado = async (store, request = axios) => {
    try {
        
      const range = convertToRange(store.state.selectedDate);
      const cryptEmail = encrypt(store.state.user.email);
      const response = await request.get(
          `${server_config.hostname}/projetado/getByMonth/${range.init}.${range.end}.${cryptEmail}`
      );
      const projetado = response.data;
      
      store.setState( {projetado})
    } catch (error) {
      const isError404 = error.response && error.response.status === 404;
      const status = isError404 ? "NOT_FOUND" : "ERROR";
      console.log(status);
    }
  }; 

  // export const getRealProjetado = async (store, request = axios) => {
  //   try {
        
  //     const range = convertToRange(store.state.selectedDate);
      
  //     const response = await request.get(
  //         `${server_config.hostname}/extrato/getByMonth/${range.init}.${range.end}/realporprojetado`
  //     );
  //     const realProjetado = response.data;
  //     console.log('REALPROJETADO', realProjetado)
  //     store.setState( {realProjetado})
  //   } catch (error) {
  //     const isError404 = error.response && error.response.status === 404;
  //     const status = isError404 ? "NOT_FOUND" : "ERROR";
  //     console.log(status);
  //   }
  // }; 

  export const getPrediction = async (store, request = axios) => {

      
      const {dropdownMonthList } = store.state;
      const cryptEmail = encrypt(store.state.user.email);
      try{
        
        const response = await request.get(
          `${server_config.hostname}/projetado/getAll/${cryptEmail}`
      );
          
          const {data} = response;
          
          const prediction = [];
          for (let i = 0; i < dropdownMonthList.length; i++) {
            let index = prediction.length;
            const month = dropdownMonthList[i].key;
            const range = convertToRange(month);

            let details = {date: '', saldoInicial: 0, entradas:0, saidas:0, saldoFinal:0 };

            
            const filtered = data.filter( item => convertToDate(item.init_date) <= range.init &&
                                                  convertToDate(item.end_date) >= range.end &&
                                                  checkPeriodicity(item.init_date, range.init, item.period)     )
            
            
            for (let x = 0; x < filtered.length; x++) {
              const item = filtered[x];
              
              switch (item.tipo_mov) {
                case 'E':                
                details.entradas += Number(convertToNumber(item.valor));
                  break;
                case 'S':
                details.saidas += Number(convertToNumber(item.valor));
                break;
                default:
                break;
              }

            }

            if (index >= 1) {
              details.saldoInicial = prediction[index-1].saldoFinal;    
            }     
            else
            {
              const response = await request.get(
                `${server_config.hostname}/fechamentos/getAll/${cryptEmail}`
            );
        
            const fechamentos = response.data;
        
            fechamentos.forEach(item => {
                item.date = convMonthYear(item.mes, item.ano);
            });

            const firstLine = fechamentos.filter( item =>  item.date === month );
            
            if (firstLine.length > 0) {
              details.saldoInicial = Number(convertToNumber(firstLine[0].saldo_inicial));   
              details.entradas = Number(convertToNumber(firstLine[0].entradas));
              details.saidas = Number(convertToNumber(firstLine[0].saidas));
            }

            }

              
              details.saldoFinal = 
              details.saldoInicial + details.entradas -  details.saidas;            

            details.date = month;
            
            
            prediction.push(details);
            
          }
          
          store.setState({prediction});
    
        } catch (error) {
          const isError404 = error.response && error.response.status === 404;
          const status = isError404 ? "NOT_FOUND" : "ERROR";
          console.log(status);
          return status;
        }        
    
  };   

  //////////////////////////////////////////////////////////////////

export const openModal = (store, id) => {
  console.log('open modal');
  let data = {};
  let init, end;
  console.log('ID',id);
  if (id >= 0) {  
    try {
      data = JSON.parse(JSON.stringify(store.state.projetadoConfig.find(item => item.id === id )));      
    } catch (error) {
      data = JSON.parse(JSON.stringify(store.state.projetado.find(item => item.id === id )));    
    }
    
    
    console.log('data',data);
    init = convDateToMonthYear(data.init_date);    
    end = convDateToMonthYear(data.end_date);
    
    data.init_month = getMonth(init);
    data.init_year  = getYear(init);
    data.end_month  = getMonth(end) ;  
    data.end_year   = getYear(end)   ;
    data.ind = (data.end_year === 9999) ? true : false;

  } else if (typeof id === 'undefined')
  {
    data.init_month = new Date().getMonth()+1;
    data.init_year = new Date().getFullYear();
    data.end_month = new Date().getMonth()+1;    
    data.end_year= new Date().getFullYear();    
  }

  const modalProjetado = { open: true, data: data };
  console.log(modalProjetado);
  store.setState( {modalProjetado});

};

export const closeModal = (store) => {
  const modalProjetado = { open: false, data: {} };
  console.log(modalProjetado);
  store.setState( {modalProjetado});
};

export const updateFields = (store, name, value) => {
  
  const modalProjetado = JSON.parse(JSON.stringify(store.state.modalProjetado));
  modalProjetado.data[name] = value;
  store.setState( {modalProjetado});
  console.log(store.state.modalProjetado);
}


export const update = (store, setDates = true) => {
  
  const modalProjetado = JSON.parse(JSON.stringify(store.state.modalProjetado));
  const id = modalProjetado.data.id;

  delete modalProjetado.data.id;

  const update = { email: store.state.user.email, id: id, params: modalProjetado.data };
  
  if (setDates)
  {
  update.params.init_date = 
  convertToRange(convMonthYear(update.params.init_month, update.params.init_year)).init;

  (update.params.ind) ?
  update.params.end_date = 
  convertToRange(convMonthYear('12', '9999')).end
  :
  update.params.end_date = 
    convertToRange(convMonthYear(update.params.end_month, update.params.end_year)).end;
  }
  delete update.params.ind;
  delete update.params.init_month;
  delete update.params.init_year;
  delete update.params.end_month;
  delete update.params.end_year;

  fetch(`${server_config.hostname}/projetado/update`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(update)
  })
  .then( response => response.json() )
  .then( () => getAll(store) )
  .then( () => getProjetado(store) )
  // .then( () => getRealProjetado(store) )
  .then( () => getPrediction(store) )
  .then( () => closeModal(store) )  
  .catch( error => {
      console.log(error);
      return  error } );


}

export const add = (store) => {
  
  const modalProjetado = JSON.parse(JSON.stringify(store.state.modalProjetado));
  modalProjetado.data.email = store.state.user.email;
  console.log(modalProjetado);
  delete modalProjetado.data.id;

  const newProjetado = { params: modalProjetado.data };

    newProjetado.params.init_date = 
      convertToRange(convMonthYear(newProjetado.params.init_month, newProjetado.params.init_year)).init;
    
    (newProjetado.params.ind) ?
    newProjetado.params.end_date = 
    convertToRange(convMonthYear('12', '9999')).end
    :
    newProjetado.params.end_date = 
      convertToRange(convMonthYear(newProjetado.params.end_month, newProjetado.params.end_year)).end;

      delete newProjetado.params.ind;
      delete newProjetado.params.init_month;      
      delete newProjetado.params.init_year;
      delete newProjetado.params.end_month;
      delete newProjetado.params.end_year;

  console.log(newProjetado);
  
  fetch(`${server_config.hostname}/projetado/add`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(newProjetado)
  })
  .then( response => console.log('RESPONSE', response.json()) )
  .then( () => getAll(store) )
  .then( () => getProjetado(store) )
  // .then( () => getRealProjetado(store) )
  .then( () => getPrediction(store) )
  .then( () => closeModal(store) )  
  .catch( error => {
      console.log(error);
      return  error } );


}
 
export const selectSingle = async (store, initDate, endDate, categId, request = axios) => {
  
  try{
    const cryptEmail = encrypt(store.state.user.email);
    const response = await request.get(
      `${server_config.hostname}/projetado/selectSingle/${initDate}.${endDate}.${categId}.${cryptEmail}`
  );
       
      return response.data;

    } catch (error) {
      const isError404 = error.response && error.response.status === 404;
      const status = isError404 ? "NOT_FOUND" : "ERROR";
      console.log(status);
      return status;
    }

}


export const syncCustoProj = (store, data) => {
  
  const monthRange = convertToRange(store.state.selectedDate);
  const modalProjetado = JSON.parse(JSON.stringify(store.state.modalProjetado));

  selectSingle(store, monthRange.init, monthRange.end, data.categ_id)
  .then( res => {
    console.log('RESPONSE', res[0].valor, data);
    modalProjetado.data = res[0];

    modalProjetado.data.valor = convertToNumber(data.custoReal);
    modalProjetado.data.init_date = convertToDate(modalProjetado.data.init_date);
    modalProjetado.data.end_date = convertToDate(modalProjetado.data.end_date);

    store.setState({modalProjetado})
  })
  .finally( () => {
    console.log('RESPONSE NADA');
    // console.log(store.state.modalProjetado);
    update(store, false);
  })
  .catch(error => console.log(error));

}

export const syncRealProj = (store, data) => {
  
  const {selectedDate} = store.state;
  let response = {};
  const monthRange = convertToRange(selectedDate);
  const modalProjetado = JSON.parse(JSON.stringify(store.state.modalProjetado));

  selectSingle(store, monthRange.init, monthRange.end, data.categ_id)
  .then( res => {
    
    response = JSON.parse(JSON.stringify(res.find(element => convertToNumber(element.valor) >= convertToNumber(data.dif))));
    
    modalProjetado.data = JSON.parse(JSON.stringify(res.find(element => convertToNumber(element.valor) > convertToNumber(data.dif)))) ;
      
    modalProjetado.data.init_month = modalProjetado.data.end_month = getMonth(selectedDate);
    modalProjetado.data.init_year = modalProjetado.data.end_year = getYear(selectedDate);
    modalProjetado.data.valor = convertToNumber(response.valor) - convertToNumber(data.dif);
    modalProjetado.data.period = 1;
    store.setState({modalProjetado})
    
  })
  .then( () => {
    delete modalProjetado.data.id
    delete modalProjetado.data.end_date
    delete modalProjetado.data.init_date
    add(store);    
  })
  .finally( () => {
  
    modalProjetado.data = JSON.parse(JSON.stringify(response));
    
    modalProjetado.data.valor = convertToNumber(modalProjetado.data.valor);
    modalProjetado.data.init_date = convertToRange(getFutureMonths(getMonth(selectedDate), getYear(selectedDate), 2)[1].key).init;
    modalProjetado.data.end_date = convertToDate(modalProjetado.data.end_date);
    modalProjetado.data.period = 1;

    console.log();
    if (getMonthRange().end >= modalProjetado.data.end_date) {
      
      remove(store, modalProjetado.data.id);
      
    }else{
      store.setState({modalProjetado});  
      update(store, false);
    }

    
  })
  .catch(error => console.log(error));


  
}

export const syncAddCustoProj = (store, data) => {
  // console.log(store.state.selectedDate);
  // const monthRange = convertToRange(store.state.selectedDate);
  const modalProjetado = JSON.parse(JSON.stringify(store.state.modalProjetado));
  
    modalProjetado.data.tipo_mov = 'S';
    modalProjetado.data.descr = 'Adicionado automaticamente';
    modalProjetado.data.payment_day = '';
    modalProjetado.data.categ_id = data.categ_id;
    modalProjetado.data.valor = data.dif * -1;
    modalProjetado.data.init_month = THIS_MONTH;
    modalProjetado.data.init_year = THIS_YEAR;
    modalProjetado.data.end_month = THIS_MONTH;
    modalProjetado.data.end_year = THIS_YEAR;
    modalProjetado.data.period = 1;
    store.setState({modalProjetado})

    add(store);

}

export const remove = (store, id) => {
  
  const proj = { id: id, email: store.state.user.email };

  fetch(`${server_config.hostname}/projetado/del`, 
  {
       method: 'delete',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(proj)
  })
  .then( response => response.json() )
  .then( () => getAll(store) )
  .then( () => getProjetado(store) )
  .then( () => getPrediction(store) )
  .catch( error => {
      console.log(error);
      return  error } );


}