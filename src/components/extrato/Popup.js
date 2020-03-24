import React from 'react'
import useGlobal from "../../store/index.js";
import { Table, Dropdown } from 'semantic-ui-react';
import {  monthDiff } from '../../helpers/date'
import { setText } from "../../i18n/utils";



const Popup = ({categ_id}) => { 
    const [globalState] = useGlobal();
    
    const { moviments, intl, categoriasDropDown, tipoContaDropDown } = globalState;

    const getText = (id) => {
        return  setText(intl, id);
       }

       const setPeriod = (item) => {
        const dif = monthDiff( new Date(item.init_date), new Date(item.end_date));  
    
        return (dif === '') ? 'Indeterminado' : (dif > 1 ) ? `${dif} meses` : `${dif} mês` ;
    
    }
        
       const list = () => {
   
        try {

            const filtered  = moviments.filter( item => item.categ_id === categ_id)

            return  ( filtered.map( (item, i) => {
    
              
                return (                    
                    <Table.Row key={i}>
                     <Table.Cell>
                      <Dropdown
                        open={false}
                        icon={''}
                        placeholder='Seleciona Tipo'       
                        name='id_tipo'
                        value={item.id_tipo}
                        options={tipoContaDropDown} />    
                      </Table.Cell>
                      <Table.Cell>{item.dt_lanc}</Table.Cell>
                      <Table.Cell>{item.dt_valor}</Table.Cell>
                      <Table.Cell>{item.descr}</Table.Cell>
                      <Table.Cell>{item.valor}</Table.Cell>
                      <Table.Cell>
                      <Dropdown
                        open={false}
                        icon={''}
                        placeholder='Selecionar Categoria'       
                        name='categ_id'
                        value={item.categ_id}
                        options={categoriasDropDown} />                           
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
            <Table.HeaderCell>Tipo de Conta</Table.HeaderCell>
          <Table.HeaderCell>Data Lanç</Table.HeaderCell>
          <Table.HeaderCell>Data Valor</Table.HeaderCell>
          <Table.HeaderCell>Descrição</Table.HeaderCell>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.HeaderCell>{getText('categorias')}</Table.HeaderCell>   
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