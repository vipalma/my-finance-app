import React from "react";
import useGlobal from "../../store";
import { Table, Dropdown, Icon, Popup} from 'semantic-ui-react';
import { convertToMoney }from '../../helpers/general'
import MessageArea from "../MessageArea";
import PopupProj from "../configProjetado/Popup"
import PopupMov from  "../extrato/Popup"



const AnaliseProjReal = () => {

  const [globalState, globalActions] = useGlobal();

  const { analise, categoriasDropDown } = globalState;
  
  
const updateCustoProj = (data, e ) => {
    console.log(data.custoProjetado);
    (data.custoProjetado > 0) ?
    globalActions.actProjetado.syncAddCustoProj(data) : globalActions.actProjetado.syncAddCustoProj(data);
}

  
const updateCustoReal = (data, e ) => {
  console.log(data.custoReal, data.custoProjetado);
  globalActions.actProjetado.syncRealProj(data)
}

const syncCell = (line) =>{
    // console.log('SYNCCELL', line)
    return (        
        <div>
            <span className='mr2'>{convertToMoney(line.custoProjetado)}</span>
            <Icon  link color='green' name='sync' 
                onClick={updateCustoProj.bind(this, line)}  />            
        </div>
        )
}

const setCellContent = (line) => {
     const custoProjetado = (line.custoProjetado !== null ) ?
     line.custoProjetado : 0;
        

        const custoReal = line.custoReal;
        return (custoReal > custoProjetado) ? syncCell(line) : convertToMoney(line.custoProjetado);

}

const syncCellReal = (line) =>{
  // console.log('SYNCCELL', line)
  return (        
      <div>
          <span className='mr2'>{convertToMoney(line.custoReal)}</span>
          <Icon  link color='green' name='sync' 
              onClick={updateCustoReal.bind(this, line)}  />            
      </div>
      )
}

const setCellContentReal = (line) => {
  const custoReal = (line.custoReal !== null ) ?
  line.custoReal : 0;
     

     const custoProjetado = line.custoProjetado;
     return (custoReal < custoProjetado) ? syncCellReal(line) : convertToMoney(line.custoReal);

}




const fillData = () => {
    try {
        return analise.map( (item, i) => {
            
            return (      
            <Table.Row key={i}>
              <Table.Cell>
              <Dropdown
                        open={false}
                        icon={''}
                        placeholder='Selecionar Categoria'       
                        name='categ_id'
                        value={item.categ_id}
                        options={categoriasDropDown} />   
              </Table.Cell>
              <Table.Cell>
                <Popup 
                        on={"click"}
                        hideOnScroll={false}
                        flowing={true}
                        position='bottom left' 
                        content={<PopupMov categ_id={item.categ_id} />} 
                        trigger={<span>{setCellContentReal(item)}</span>} />
              </Table.Cell>
              <Table.Cell>
                <Popup
                        on={"click"}
                        hideOnScroll={false}
                        position='top center' 
                        onClose={ () => {console.log("close popup")}}
                        content={<PopupProj categ_id={item.categ_id} />} 
                        // content={<ModalProjAnalise item={item} />} 
                        trigger={<span>{setCellContent(item)}</span>} />

              </Table.Cell>
              <Table.Cell>{convertToMoney(item.dif)}</Table.Cell>
            </Table.Row> 
        )
        });
    } catch (error) {
        return '';
    }
    
}



const table = () => (
    <Table celled compact ={'very'} definition size={'small'} sortable>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell width={3}>Categoria</Table.HeaderCell>
          <Table.HeaderCell width={3}>Real</Table.HeaderCell>
          <Table.HeaderCell>Projetado</Table.HeaderCell>
          <Table.HeaderCell>Diferença</Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
       {fillData()}
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

export default AnaliseProjReal;
