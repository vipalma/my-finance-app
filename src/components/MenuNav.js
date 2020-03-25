import React from "react";
import useGlobal from "../store";
import { Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './menuNav.css'
import { setText } from "../i18n/utils";


const MenuNav = () => {
  const [globalState, globalActions] = useGlobal();

  const { dropdownMonthList, intl, selectedDate, fireBase } = globalState;


  const getText = (id) => {
    return setText(intl, id);
  }
    
  return (  
            <Menu className='main'>
            <Menu.Item className='color-white' name={getText('inicio')}  as={Link} to='/'>
            </Menu.Item>
            <Menu.Item className='color-white' name={getText('analise')} as={Link} to='/Analise' />
            <Menu.Item className='color-white' name={getText('extrato')} as={Link} to='/Extrato' />
            <Dropdown  className='color-white'  item text={getText('configurar')}>
              <Dropdown.Menu>
                <Dropdown.Item icon='edit' text={getText('categorias')}  as={Link} to='/ConfigCateg' />
                <Dropdown.Item icon='globe' as={Link} to='/ConfigTpConta' text={getText('tpConta')}/>
                <Dropdown.Item icon='settings' as={Link} to='/ConfigProjetado' text={getText('projetado')} />
              </Dropdown.Menu>
          </Dropdown>
            <Menu.Menu position='right'>
              <Menu.Item  className='color-white' >
              <Dropdown
                        placeholder='Selecionar Mês'
                        fluid
                        search
                        selection
                        value={selectedDate}
                        onChange={(e, target) => globalActions.actDates.selectDate(e, target.value) }
                        options={dropdownMonthList}
                      />   
              </Menu.Item>
              <Menu.Item name='Logout' onClick={ () => fireBase.signOut() } />
            </Menu.Menu>
          </Menu>
  );
};

export default MenuNav;
