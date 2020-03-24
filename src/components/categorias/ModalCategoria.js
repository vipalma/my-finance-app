import React from "react";
import useGlobal from "../../store";
import Categorias from "./Categorias.js";
import { Modal, Form, Button, Icon, Checkbox} from 'semantic-ui-react';




const ModalCategoria = () => {

  const [globalState, globalActions] = useGlobal();

  const { modalCategoria } = globalState;

  const { updateCategoriaTextContext, updateCategoria, closeModalCategoria, addCategoria,
          onDelIndChange } = globalActions.actCategorias;

  const onChangeCategoria = (e) => {
    updateCategoriaTextContext(e.target.value);
  }

  const onCheckboxChange = (e) => {
    onDelIndChange();
  }
  

  const onSave = (e) => {
    (typeof modalCategoria.data.categ_id === 'undefined') ? addCategoria() : updateCategoria();        
  }
  
  
   
  const form = () => (
    <Form>
      <Form.Field>
        <label>Id</label>
        <input value={modalCategoria.data.categ_id} placeholder='Gerado Automatico' readOnly />
      </Form.Field>
      <Form.Field>
        <label>Categoria</label>
        <input 
        onChange={onChangeCategoria}
        defaultValue={modalCategoria.data.categoria} 
        placeholder='Descrição Categoria' />
      </Form.Field>
      <Form.Field>
        <Checkbox 
        checked={modalCategoria.data.del_ind}
        onChange={onCheckboxChange}
        label='Marcar como Removido' />
    </Form.Field>      
    </Form>
  )
  

  const modal = () => (
    <Modal  open={modalCategoria.open}
            onClose={closeModalCategoria}
            trigger={<Categorias></Categorias>}>
      <Modal.Header>Editar Categoria</Modal.Header>
      <Modal.Content>
      <Modal.Description>
          {form()}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='green' inverted
       onClick={onSave} >
        <Icon name='checkmark' /> Salvar
      </Button>      
      </Modal.Actions>
    </Modal>
  )  
  

  return (  
      
      <div>
          {modal()}
      </div>
  );
};

export default ModalCategoria;
