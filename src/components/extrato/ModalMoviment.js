import React, {useState} from "react";
import useGlobal from "../../store";
import { Modal, Form, Button, Icon, Dropdown} from 'semantic-ui-react';
import { getToday } from "../../helpers/date";




const ModalMoviment = () => {

  const [globalState, globalActions] = useGlobal();

  const { modalMoviment, tipoContaDropDown, categoriasDropDown } = globalState;
  
  const [local, setLocal] = useState(modalMoviment.data);
  
  const {updateFieldsModal, updateMoviment, closeModalMov, addMoviment } = globalActions.actExtrato;

  const onChangeFields = (e, data) => { 
    
    (typeof data === 'undefined') ? 
    local[e.target.name] = e.target.value :
    local[data.name] = data.value    
    
    setLocal( prevState => ({...prevState}))

     }

  const onSave = (e) => {
    updateFieldsModal(local);
    (typeof local.id === 'undefined') ? addMoviment() : updateMoviment();    
    setLocal({})    
  }
  
  
  const form = () => (
    
    <Form>
      <Form.Field>
        <label>Tipo de Conta</label>
        <Dropdown
                        placeholder='Tipo de Conta'
                        fluid
                        search
                        selection
                        name='id_tipo'
                        value={local.id_tipo}
                        onChange={onChangeFields}
                        options={tipoContaDropDown}
                      />   
      </Form.Field>     
      <Form.Field>
        <label>Data Lançamento</label>
        <input value={local.dt_lanc} placeholder='Data Lançamento' type='date' onChange={onChangeFields} name='dt_lanc' defaultValue={getToday()}/> 
      </Form.Field>       
      <Form.Field>
        <label>Data Valor</label>
        <input value={local.dt_valor} placeholder='Data Valor' type='date' onChange={onChangeFields} name='dt_valor'  defaultValue={getToday()}/> 
      </Form.Field>     
      <Form.Field>
        <label>Descrição</label>
        <input value={local.descr || ''} placeholder='Descrição' type='text' onChange={onChangeFields} name='descr'/> 
      </Form.Field>   
      <Form.Field>
        <label>Categoria</label>
        <Dropdown
                        placeholder='Categoria'
                        fluid
                        search
                        selection
                        name='categ_id'
                        value={local.categ_id}
                        onChange={onChangeFields}
                        options={categoriasDropDown}
                      />   
      </Form.Field>         
      <Form.Field>
        <label>Valor</label>
        <input value={local.valor || ''} placeholder='Valor' type='number' step='0.01' onChange={onChangeFields} name='valor'/> 
      </Form.Field>              
    </Form>
  )
  

  const modal = () => (
    <Modal  open={modalMoviment.open}
            onClose={closeModalMov}
            >
      <Modal.Header>Movimento</Modal.Header>
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
  
  console.log("Render Modal");
  return (  
      
      <div>
          {modal()}
      </div>
  );
};

export default ModalMoviment;
