import React from "react";
import useGlobal from "../store";
import { Button, Checkbox, Icon, Table, Dropdown } from 'semantic-ui-react';
import Dropzone from 'react-dropzone'
import { setText } from "../i18n/utils";
import MessageArea from "./MessageArea";



const Movimentos = () => {

  const [globalState, globalActions] = useGlobal();

  const {  moviments, categoriasDropDown, tipoContaDropDown, intl} = globalState;
  const { updateFields } = globalActions.actExtrato;

  const getText = (id) => {
    return  setText(intl, id);
   }


const uploadNewMoviments = event => {
    globalActions.actExtrato.setExtratoUpload(event[0]);
};

const onChangeCheckbox = (i, event, data) => {
    globalActions.actExtrato.setCheckbox(i, data.checked);
}

const onSelectCategoria = (i, event, data) => {
    globalActions.actExtrato.setCategoria(i, data.value);
}

const onChangeFields = (i, e, data) => { 
  (typeof data === 'undefined') ? 
  updateFields(e.target.name, e.target.value, i ) :
  updateFields(data.name, data.value, i )

   }  


const onSelectAllCheckbox = () => {
    for (let index = 0; index < moviments.length; index++) {
        if (!moviments[index].checkboxDisable) {
            globalActions.actExtrato.setCheckbox(index, true);    
        }
        
    }
    
}

const saveMoviments = () => {
    globalActions.actExtrato.saveMoviments();
}

const addMoviment = () => {
    globalActions.actExtrato.openModalMoviment();
}

const remove = (i) => {
  globalActions.actExtrato.remove(i);
}


// const dropZone = () => {
//     return ( <Dropzone onDrop={uploadNewMoviments}>
//     {({getRootProps, getInputProps}) => (
//       <section >
//         <div {...getRootProps()}>
//           <input {...getInputProps()} />
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         </div>
//       </section> 
//     )}
//     </Dropzone> )    
// }


  const extratoAll = () => {
              
    try {
        return moviments.map( (item, i) => {
  
            return (                    
            <Table.Row key={i}>
              <Table.Cell collapsing>
                <Checkbox  
                  checked={item.checked}
                  disabled={item.checkboxDisable}
                  onChange={onChangeCheckbox.bind(this, i)}
                />
              </Table.Cell>
              <Table.Cell collapsing>
              <Dropdown
                        placeholder='Seleciona Tipo'
                        fluid
                        search
                        selection
                        name='id_tipo'
                        value={item.id_tipo}
                        options={tipoContaDropDown}
                        onChange={onChangeFields.bind(this, i)}
                      />                          
              </Table.Cell>
              <Table.Cell collapsing>{item.dt_lanc}</Table.Cell>
              <Table.Cell collapsing>{item.dt_valor}</Table.Cell>
              <Table.Cell>{item.descr}</Table.Cell>
              <Table.Cell>{item.valor}</Table.Cell>
              <Table.Cell>
              <Dropdown
                        placeholder='Seleciona a Categoria'
                        fluid
                        search
                        selection
                        onChange={onSelectCategoria.bind(this, i)}
                        value={item.categ_id}
                        options={categoriasDropDown}
                      />                          
              </Table.Cell>
              <Table.Cell textAlign={"center"} collapsing>
                  <Icon circular inverted color='red'  name='remove' link
                  onClick={remove.bind(this,i)}></Icon>
              </Table.Cell>                   
            </Table.Row> 
        )
        });
    } catch (error) {
        return '';
    }
  
  
  };
  
  const table = () => (
    <Table celled compact ={'very'} definition size={'small'} sortable={true} padded={'very'}>
      <Table.Header >
      <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='6'>
          <Button 
                onClick={saveMoviments}
              floated='right' icon labelPosition='left' primary size='mini'>
              <Icon name='chevron up' /> Salvar Selecionados
            </Button>
          <Button 
                onClick={addMoviment}
              floated='right' icon labelPosition='left' primary size='mini'>
              <Icon name='chevron up' /> Adicionar
            </Button>          
            <Dropzone onDrop={uploadNewMoviments}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button 
                            floated='right' icon labelPosition='left' primary size='mini'>
                            <Icon name='chevron up' /> Upload
                    </Button>
                    </div>
                )}
            </Dropzone>
            
            <Button enable="true" size='mini' onClick={onSelectAllCheckbox} >
              Marcar/Desmarcar Todos
            </Button>
          </Table.HeaderCell>
        </Table.Row>      
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Tipo de Conta</Table.HeaderCell>
          <Table.HeaderCell>Data Lançamento</Table.HeaderCell>
          <Table.HeaderCell>Data Valor</Table.HeaderCell>
          <Table.HeaderCell>Descrição</Table.HeaderCell>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.HeaderCell>{getText('categorias')}</Table.HeaderCell>
          <Table.HeaderCell>Eliminar</Table.HeaderCell>  
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
        {extratoAll()}
      </Table.Body>

    </Table>
  )

  return (  
      
      <div>
          <MessageArea></MessageArea>
          {table()}
          
      </div>
  );
};

export default Movimentos;
