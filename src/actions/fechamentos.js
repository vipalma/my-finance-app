import axios from "axios";
import server_config from '../helpers/server.js';
import { convMonthYear, getMonth, getYear } from "../helpers/date.js";
import { roundNumber, encrypt } from "../helpers/general.js";

export const getAll = async (store, request = axios) => {
  try {
    const cryptEmail = encrypt(store.state.user.email);
    const response = await request.get(
        `${server_config.hostname}/fechamentos/getAll/${cryptEmail}`
    );

    const fechamentos = response.data;

    fechamentos.forEach(item => {
        item.date = convMonthYear(item.mes, item.ano);
    });
    
    store.setState( {fechamentos})
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    console.log(status);
  }
};

export const save = (store, data, request = axios) => {
  
  const { selectedDate, prediction } = store.state;
  const cryptEmail = encrypt(store.state.user.email);

  const filtered = prediction.filter( item => item.date === selectedDate );
  
  const line  = filtered[0];
  
  const newFechamento = { params:     {
                                          "mes": getMonth(selectedDate),
                                          "ano": getYear(selectedDate),
                                          "saldo_inicial": roundNumber(line.saldoInicial),
                                          "entradas": roundNumber(line.entradas),
                                          "saidas": roundNumber(line.saidas),
                                          "saldo_final": roundNumber(line.saldoFinal),
                                          "email": store.state.user.email
                                      }
                        };
  console.log(newFechamento);
  fetch(`${server_config.hostname}/fechamentos/add`, 
  {
       method: 'post',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(newFechamento)
  })
  .then( response => console.log(response.json()) )
  .catch( error => {
      console.log(error);
      return  error } );

}
