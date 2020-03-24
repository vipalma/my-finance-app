import React, {useEffect} from "react";
import useGlobal from "../../store";
import { Button, Icon, Table, Dropdown } from 'semantic-ui-react';
import { convertToDate, monthDiff, convDateToMonthYear } from '../../helpers/date'

const Projetado = () => {

  const [globalState, globalActions] = useGlobal();

  const { projetadoConfig, tipoMov, categoriasDropDown, periodDropDown } = globalState;
  
useEffect(() => {
  globalActions.actProjetado.getAll();
}, [])

const openModal = (i) => {
    globalActions.actProjetado.openModal(i);
}

const add = () => {
    globalActions.actProjetado.openModal();
}

const remove = (id) => {
    globalActions.actProjetado.remove(id);
}

const setPeriod = (item) => {
    const dif = monthDiff( new Date(item.init_date), new Date(item.end_date));  

    return (dif === '') ? 'Indeterminado' : (dif > 1 ) ? `${dif} meses` : `${dif} mês` ;

}


const list = () => {

    const filtered = projetadoConfig.filter( item => new Date(item.end_date) > new Date() );
   
    try {
        return  ( filtered.map( (item, i) => {

          
        return (
            <Table.Row key={i}>
              <Table.Cell textAlign={"center"}>
                  <Icon circular inverted color='grey' name='edit' link
                  onClick={openModal.bind(this,item.id)}></Icon>
              </Table.Cell>            
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
              <Table.Cell textAlign={"center"}>
                  <Icon circular inverted color='red'  name='remove' link
                  onClick={remove.bind(this,item.id)}></Icon>
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
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='6'>
            <Button 
                onClick={add}
              floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='add' /> Adicionar
            </Button>
          </Table.HeaderCell>
        </Table.Row>    

        <Table.Row>
        <Table.HeaderCell width={"1"}></Table.HeaderCell> 
          <Table.HeaderCell>Data Inicio</Table.HeaderCell>          
          <Table.HeaderCell>Data Fim</Table.HeaderCell>          
          <Table.HeaderCell>Periodo</Table.HeaderCell>          
          <Table.HeaderCell>Periodicidade</Table.HeaderCell>          
          <Table.HeaderCell>Dia Pagamento</Table.HeaderCell>          
          <Table.HeaderCell>Categoria</Table.HeaderCell> 
          <Table.HeaderCell>Descrição</Table.HeaderCell>          
          <Table.HeaderCell>Valor</Table.HeaderCell>          
          <Table.HeaderCell>Tipo Movimento</Table.HeaderCell>        
          <Table.HeaderCell>Eliminar</Table.HeaderCell>        
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
};

export default Projetado;
