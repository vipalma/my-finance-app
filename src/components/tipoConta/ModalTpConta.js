import React from "react";
import useGlobal from "../../store";
import TpConta from "./TpConta";
import { Modal, Form, Button, Icon, Dropdown} from 'semantic-ui-react';

const ModalTpConta = () => {

  const [globalState, globalActions] = useGlobal();

  const { modalTpConta, tipoMov } = globalState;

  const { updateTipo, updateTpConta, updateVencimento, closeModalTpConta, addTpConta, updateFields } = globalActions.actTipoContas;

  const onChangeTipo = (e) => { updateTipo(e.target.value); }

  const onChangeVencimento = (e) => { updateVencimento(e.target.value); }  

  const onSave = (e) => {
    (typeof modalTpConta.data.id_tipo === 'undefined') ? addTpConta() : updateTpConta();        
  }

  const onChangeFields = (e, data) => { 
    
    (typeof data === 'undefined') ? 
    updateFields(e.target.name, e.target.value ) :
    updateFields(data.name, data.value )

     }  
  
  
  const form = () => (
    <Form>
      <Form.Field>
        <label>Id</label>
        <input value={modalTpConta.data.id_tipo} placeholder='Gerado Automatico' readOnly />
      </Form.Field>
      <Form.Field>
        <label>Tipo de Conta</label>
        <input 
        onChange={onChangeTipo}
        defaultValue={modalTpConta.data.tipo} 
        placeholder='Descrição Tipo de Conta' />
      </Form.Field>
      <Form.Field>
        <label>Vencimento</label>
        <input 
        onChange={onChangeVencimento}
        defaultValue={modalTpConta.data.vencimento} 
        placeholder='Vencimento (Opcional)' />
      </Form.Field>      
      <Form.Field>
        <label>Tipo de Movimentação</label>
        <Dropdown
                        placeholder='Tipo de Movimentação'
                        fluid
                        search
                        selection
                        name='tipo_mov'
                        value={modalTpConta.data.tipo_mov}
                        onChange={onChangeFields}
                        options={tipoMov}
                      />   
      </Form.Field>     
   
    </Form>
  )
  

  const modal = () => (
    <Modal  open={modalTpConta.open}
            onClose={closeModalTpConta}
            trigger={<TpConta></TpConta>}>
      <Modal.Header>Editar Tipo de Conta</Modal.Header>
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

export default ModalTpConta;
