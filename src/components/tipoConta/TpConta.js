import React, {useEffect} from "react";
import useGlobal from "../../store";
import { Button, Icon, Table, Dropdown } from 'semantic-ui-react';


const TpConta = () => {

  const [globalState, globalActions] = useGlobal();

  const { tipoConta, tipoMov } = globalState;
  
useEffect(() => {
  globalActions.actTipoContas.getTipoContas();
}, []) // eslint-disable-next-line react-hooks/exhaustive-deps

const openModal = (i) => {
    globalActions.actTipoContas.openModalTpConta(i);
}

const addTpConta = () => {
    globalActions.actTipoContas.openModalTpConta();
}

const list = () => {
    try {
        return  ( tipoConta.map( (item, i) => {

        return (
            <Table.Row key={i}>
              <Table.Cell textAlign={"center"}>
                  <Icon circular inverted color='grey' name='edit' link
                  onClick={openModal.bind(this,i)}></Icon>
              </Table.Cell>            
              {/* <Table.Cell textAlign={"center"}>{item.id_tipo}</Table.Cell>                             */}
              <Table.Cell>        
              <Dropdown
                        placeholder='Tipo de Movimentação'
                        open={false}
                        icon={''}
                        fluid                        
                        name='tipoMov'
                        value={item.tipo_mov}
                        options={tipoMov}
                      />  
                </Table.Cell>  
              <Table.Cell>{item.vencimento}</Table.Cell> 
              <Table.Cell>{item.tipo}</Table.Cell>                    
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
                onClick={addTpConta}
              floated='left' icon labelPosition='left' primary size='mini'>
              <Icon name='add' /> Adicionar
            </Button>
          </Table.HeaderCell>
        </Table.Row>    

        <Table.Row>
        <Table.HeaderCell width={"1"}></Table.HeaderCell> 
        {/* <Table.HeaderCell width={"1"} textAlign={"center"}>ID</Table.HeaderCell>          */}
        <Table.HeaderCell collapsing textAlign={"center"}>Tipo Movimento</Table.HeaderCell>      
        <Table.HeaderCell width={"1"} textAlign={"center"}>Vencimento</Table.HeaderCell>      
        <Table.HeaderCell>Descrição</Table.HeaderCell>                    
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

export default TpConta;
