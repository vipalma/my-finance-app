import React from 'react'
import useGlobal from "../../store/index.js";
import { Table, Dropdown, Icon } from 'semantic-ui-react';
import {  monthDiff, convDateToMonthYear, convertToRange, checkPeriodicity } from '../../helpers/date'
import { setText } from "../../i18n/utils";



const Popup = ({categ_id}) => { 
    const [globalState, globalActions] = useGlobal();

    const { projetado, intl, categoriasDropDown, tipoMov, periodDropDown, selectedDate } = globalState;

    const openModal = (i) => {
      globalActions.actProjetado.openModal(i);
  }

    const getText = (id) => {
        return  setText(intl, id);
       }

       const setPeriod = (item) => {
        const dif = monthDiff( new Date(item.init_date), new Date(item.end_date));  
    
        return (dif === '') ? 'Indeterminado' : (dif > 1 ) ? `${dif} meses` : `${dif} mês` ;
    
    }
        
       const list = () => {
   
        try {

            const filtered  = projetado.filter( item => item.categ_id === categ_id &&
                                                        checkPeriodicity(item.init_date, convertToRange(selectedDate).init, item.period) )

            return  ( filtered.map( (item, i) => {
    
              
            return (
                <Table.Row key={i}>                   
                  <Table.Cell>{convDateToMonthYear(item.init_date)}</Table.Cell>                            
                  <Table.Cell>{convDateToMonthYear(item.end_date)}</Table.Cell>         
                  <Table.Cell>{setPeriod(item)}</Table.Cell>  
                  <Table.Cell> 
                  <Dropdown
                        open={false}
                        icon={''}   
                        placeholder='Periodicidade'       
                        name='period'
                        value={item.period}
                        options={periodDropDown}
                      />     
              </Table.Cell>                          
                  <Table.Cell>{item.payment_day}</Table.Cell>         
                  <Table.Cell>
                  <Dropdown
                            open={false}
                            icon={''}   
                            placeholder='Selecionar Categoria'       
                            name='categ_id'
                            value={item.categ_id}
                            options={categoriasDropDown}
                          />     
                          </Table.Cell>         
                  <Table.Cell>{item.descr}</Table.Cell>         
                  <Table.Cell>{item.valor}</Table.Cell>         
                  <Table.Cell>
                  <Dropdown
                            placeholder='Tipo de Movimentação'
                            open={false}
                            icon={''}
                            name='tipo_mov'
                            value={item.tipo_mov}
                            options={tipoMov}
                          />                    
                  </Table.Cell>     
                          
                </Table.Row> 
             )
            
                }
            )
            )
        } catch (error) {
            return '';
        }
    
    
    };    
    
    
    const table = () => (
        <Table celled compact ={'very'} definition size={'small'} sortable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Data Inicio</Table.HeaderCell>          
              <Table.HeaderCell>Data Fim</Table.HeaderCell>          
              <Table.HeaderCell>Periodo</Table.HeaderCell>          
              <Table.HeaderCell>Periodicidade</Table.HeaderCell>
              <Table.HeaderCell>Dia Pagamento</Table.HeaderCell>          
              <Table.HeaderCell>Categoria</Table.HeaderCell> 
              <Table.HeaderCell>Descrição</Table.HeaderCell>          
              <Table.HeaderCell>Valor</Table.HeaderCell>          
              <Table.HeaderCell>Tipo Movimento</Table.HeaderCell>      
            </Table.Row>
          </Table.Header>
          <Table.Body>
           {list()}
          </Table.Body>
         </Table>
      )
    
      return (  
          
          <div>
              {table()}
          </div>
      );

}

export default Popup;