import React, {useEffect} from "react";
import useGlobal from "../../store";
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';




const Categorias = () => {

  const [globalState, globalActions] = useGlobal();

  const { categoriasAll } = globalState;
  
useEffect(() => {
  globalActions.actCategorias.getCategoriasAll();
}, [])

const openModal = (i) => {
    globalActions.actCategorias.openModalCategoria(i);
}

const addCategoria = () => {
    globalActions.actCategorias.openModalCategoria();
}





const listCateg = () => {
   
    try {
        return  ( categoriasAll.map( (item, i) => {

        return (
            <Table.Row key={i}>
              <Table.Cell textAlign={"center"}>
                  <Icon circular inverted color='grey' name='edit' link
                  onClick={openModal.bind(this,i)}></Icon>
              </Table.Cell>            
              {/* <Table.Cell textAlign={"center"}>{item.categ_id}</Table.Cell>                             */}
              <Table.Cell>{item.categoria}</Table.Cell>
              <Table.Cell>
                  <Checkbox
                    checked={item.del_ind}
                    readOnly
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
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='6'>
            <Button 
                onClick={addCategoria}
              floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='add' /> Adicionar
            </Button>
          </Table.HeaderCell>
        </Table.Row>    

        <Table.Row>
        <Table.HeaderCell width={"1"}></Table.HeaderCell> 
        {/* <Table.HeaderCell width={"1"} textAlign={"center"}>ID</Table.HeaderCell>          */}
          <Table.HeaderCell>Categoria</Table.HeaderCell>          
          <Table.HeaderCell width={"1"} textAlign={"center"}>Removido</Table.HeaderCell>      
        </Table.Row>
      </Table.Header>
      <Table.Body>
       {listCateg()}
      </Table.Body>
     </Table>
  )

  return (  
      
      <div>
          {table()}
      </div>
  );
};

export default Categorias;
