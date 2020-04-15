import React from "react";
import useGlobal from "../../store";
import {Dropdown, Checkbox} from 'semantic-ui-react';
import { convertToDate, convertToRange } from '../../helpers/date'


const DatePicker = ({labelName, quantityYear, onChange, 
                   month, year, showIndeterminado, checked, onChangeCheckbox }) => {
    
    const monthsNames = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];

    const monthsDropDown = [];                  
    const yearDropDown = [];  
    let countYear = new Date().getFullYear();

    const divClass = showIndeterminado ? 'w-60' : 'w-50';

    for (let index = 0; index < monthsNames.length; index++) {
        const month = monthsNames[index];

        monthsDropDown.push({value: index+1, key: index, text: month});
        
    }

    for (let index = 0; index <= quantityYear; index++) {
        yearDropDown.push({value: countYear, key: countYear, text: countYear});
        countYear++;
        
    }    

    if (checked)
        yearDropDown.push({value: 9999, key: 9999, text: 9999});

const showCheckbox = () => {
    
    return showIndeterminado ?
     (
        <div className='flex pl2 pt2'>
        <Checkbox  
                  checked={checked}
                  onChange={onChangeCheckbox}
                />   
                <label className='mh1 b'>Indeterminado</label>
        </div>
    )
    :
    ( <> </> );

}
    

    
    return (
        <>
        <div className={divClass}>
        <label className='b'>{labelName}</label>
        <div className='flex'>
            
                
                <Dropdown 
                                placeholder='Mês'
                                fluid
                                search
                                selection
                                name='month'
                                defaultValue={month} 
                                onChange={onChange}
                                disabled={checked}
                                options={monthsDropDown}
                            />       
                <Dropdown
                                placeholder='Ano'
                                fluid
                                search
                                selection
                                name='year'
                                defaultValue={year}    
                                onChange={onChange}    
                                disabled={checked}                
                                options={yearDropDown}
                            />        
                {showCheckbox()}                         
                    
            </div>
        </div>
        </>
    )

};

export default DatePicker;
