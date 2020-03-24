import React from "react";
import useGlobal from "../../store";
import Projetado from "./Projetado";
import { Modal, Form, Button, Icon, Dropdown} from 'semantic-ui-react';
import { convertToNumber } from '../../helpers/general'
import DatePicker from "../datepicker/DatePicker";


const ModalProj = () => {

  const [globalState, globalActions] = useGlobal();

  const { categoriasDropDown, modalProjetado, tipoMov, periodDropDown } = globalState;

  const { updateFields, update , closeModal, add } = globalActions.actProjetado;



  const onChangeFields = (e, data) => { 
    
    (typeof data === 'undefined') ? 
    updateFields(e.target.name, e.target.value ) :
    updateFields(data.name, data.value )

     }

  const { id, ind, categ_id, valor, payment_day, 
         descr, tipo_mov, init_month, init_year, end_month, end_year, period } = modalProjetado.data;
    
  const onSave = (e) => {
    (typeof id === 'undefined') ? add() : update();        
  }

  const setValor = (value) => {
    return (typeof value === 'undefined') ? 0 : convertToNumber(value);      
  }
  
  
  const datePickerInitChange = (e,data) => {
    if (data.name === 'month') {
      globalActions.actProjetado.updateFields('init_month', data.value);      
    } else if (data.name === 'year') {
      globalActions.actProjetado.updateFields('init_year', data.value);      
    }    
  }
   
  const datePickerEndChange = (e,data) => {
    if (data.name === 'month') {
      globalActions.actProjetado.updateFields('end_month', data.value);      
    } else if (data.name === 'year') {
      globalActions.actProjetado.updateFields('end_year', data.value);      
    }    
  }  

  const onChangeCheckbox = (e, data) => {
    globalActions.actProjetado.updateFields('ind', data.checked); 
  }
  
  
  const form = () => (
    <Form size={'tiny'}>
      <Form.Field>
        <label>Id</label>
        <input value={id} placeholder='Gerado Automatico' readOnly />
      </Form.Field>
      <Form.Field>
        <label>Tipo de Movimentação</label>
        <Dropdown
                        placeholder='Tipo de Movimentação'
                        fluid
                        search
                        selection
                        name='tipo_mov'
                        value={tipo_mov}
                        onChange={onChangeFields}
                        options={tipoMov}
                      />   
      </Form.Field>
      <Form.Field>
        <DatePicker labelName={'Data Início'} 
                   quantityYear={2}
                   month={init_month}
                   year={init_year}
                  onChange={datePickerInitChange} />
      </Form.Field>
      
      <Form.Field>
        <DatePicker labelName={'Data Fim'} 
                   quantityYear={30}
                   month={end_month}
                   year={end_year}                   
                  onChange={datePickerEndChange}
                  checked = {ind}
                  onChangeCheckbox={onChangeCheckbox}
                  showIndeterminado={true} />
      </Form.Field> 
      <Form.Field>
        <label>Periodicidade</label>
        <Dropdown
                        placeholder='Periodicidade'
                        fluid
                        search
                        selection
                        name='period'
                        value={period}
                        onChange={onChangeFields}
                        options={periodDropDown}
                      />   
      </Form.Field>             
      <Form.Field>
        <label>Dia de Pagamento</label>
        <input
        name='payment_day' 
        onChange={onChangeFields}
        defaultValue={payment_day} 
        placeholder='Dia de Pagamento' />
      </Form.Field>      
      <Form.Field>
        <label>Descrição Breve</label>
        <input
        name='descr' 
        onChange={onChangeFields}
        defaultValue={descr} 
        placeholder='Descrição Breve' />
      </Form.Field>              
      <Form.Field>
        <label>Categoria</label>
        <Dropdown
                        placeholder='Selecionar Categoria'
                        fluid
                        search
                        selection
                        name='categ_id'
                        value={categ_id}
                        onChange={onChangeFields}
                        options={categoriasDropDown}
                      />            
      </Form.Field>         
      <Form.Field>
        <label>Valor</label>
        <input
        name='valor' 
        onChange={onChangeFields}
        defaultValue={setValor(valor)} 
        placeholder='Valor' />
      </Form.Field>          
    </Form>
  )
  

  const modal = () => (
    <Modal  open={modalProjetado.open}
            closeOnDimmerClick={false}
            closeIcon={true}
            closeOnEscape={true}
            onClose={closeModal}
            trigger={<Projetado></Projetado>}>
      <Modal.Header>Editar Projetado</Modal.Header>
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

export default ModalProj;
